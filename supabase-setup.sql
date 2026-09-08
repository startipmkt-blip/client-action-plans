-- Execute no SQL Editor do Supabase

create table if not exists checklist_items (
  id uuid default gen_random_uuid() primary key,
  client_slug text not null,
  page_slug text not null,
  label text not null,
  position int not null default 0,
  checked boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_checklist_client_page
  on checklist_items (client_slug, page_slug);

alter table checklist_items enable row level security;

create policy "Allow public read" on checklist_items
  for select using (true);

create policy "Allow public update" on checklist_items
  for update using (true);

create policy "Allow public insert" on checklist_items
  for insert with check (true);

insert into checklist_items (client_slug, page_slug, label, position) values
  ('mariah-ozonioterapia', 'plano-acao', 'Tempo de resposta: 5 a 10 minutos', 0),
  ('mariah-ozonioterapia', 'plano-acao', 'Nunca envie só o preço', 1),
  ('mariah-ozonioterapia', 'plano-acao', 'Sempre ofereça duas opções de horário', 2),
  ('mariah-ozonioterapia', 'plano-acao', 'Sinal de R$ 50 só após confirmar o dia', 3),
  ('mariah-ozonioterapia', 'plano-acao', 'Use áudios e vídeos', 4),
  ('mariah-ozonioterapia', 'plano-acao', 'Horários de resposta: horário comercial', 5),
  ('mariah-ozonioterapia', 'plano-acao', '5 tentativas, depois arquive', 6),
  ('mariah-ozonioterapia', 'plano-acao', 'Pergunte a cidade antes de falar valor', 7);
