CREATE TABLE IF NOT EXISTS public.links (
    "linkFrom" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "linkTo" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "linkCode" character varying(255) COLLATE pg_catalog."default",
    date date,
    clicks numeric NOT NULL DEFAULT 0,
    owner integer,
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    CONSTRAINT links_pkey PRIMARY KEY (id),
    CONSTRAINT link_to_code_key UNIQUE ("linkTo", "linkCode"),
    CONSTRAINT link_owner_fkey FOREIGN KEY (owner) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
)