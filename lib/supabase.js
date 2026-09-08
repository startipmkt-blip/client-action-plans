const SUPABASE_URL = 'https://oxenrjsagtfmdgcrkvzs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_YhKXKt2yQt0CB1H4oJPm1Q_fGLI0Cz2';

async function supabaseFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': options.prefer || 'return=representation',
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
  return res.json();
}

async function loadChecklist(clientSlug, pageSlug) {
  try {
    const items = await supabaseFetch(
      `checklist_items?client_slug=eq.${clientSlug}&page_slug=eq.${pageSlug}&order=position.asc`
    );
    return items;
  } catch (e) {
    console.error('Failed to load checklist:', e);
    return null;
  }
}

async function toggleChecklistItem(id, checked) {
  try {
    await supabaseFetch(`checklist_items?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ checked, updated_at: new Date().toISOString() }),
    });
    return true;
  } catch (e) {
    console.error('Failed to toggle item:', e);
    return false;
  }
}

function initChecklist(clientSlug, pageSlug) {
  document.querySelectorAll('.checklist li').forEach(async (li, i) => {
    const items = await loadChecklist(clientSlug, pageSlug);
    if (!items) return;

    const item = items.find(it => it.position === i);
    if (item && item.checked) {
      li.classList.add('done');
      li.setAttribute('data-id', item.id);
    } else if (item) {
      li.setAttribute('data-id', item.id);
    }
  });

  document.querySelectorAll('.checklist li').forEach(li => {
    li.style.cursor = 'pointer';
    li.addEventListener('click', async () => {
      const id = li.getAttribute('data-id');
      if (!id) return;
      const isDone = li.classList.toggle('done');
      await toggleChecklistItem(id, isDone);
    });
  });
}
