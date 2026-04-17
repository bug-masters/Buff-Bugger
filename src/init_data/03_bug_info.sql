--
-- PostgreSQL database dump
--

\restrict boS2xgh1UBCGnzjPpHTfnrD1TQSxc0ZOLJwrlffBXY26bkCXo5sCczhAYpNaepj

-- Dumped from database version 14.22 (Debian 14.22-1.pgdg13+1)
-- Dumped by pg_dump version 18.2

-- Started on 2026-04-15 17:18:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16413)
-- Name: bug_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bug_info (
    bug_id bigint NOT NULL,
    common_name text NOT NULL,
    genus text NOT NULL,
    flying boolean DEFAULT false NOT NULL,
    limb_count smallint DEFAULT 0 NOT NULL,
    color text NOT NULL
);


ALTER TABLE public.bug_info OWNER TO postgres;

--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 214
-- Name: TABLE bug_info; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.bug_info IS 'bug-dex table';


--
-- TOC entry 215 (class 1259 OID 16420)
-- Name: buginfo_bugid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.buginfo_bugid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.buginfo_bugid_seq OWNER TO postgres;

--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 215
-- Name: buginfo_bugid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.buginfo_bugid_seq OWNED BY public.bug_info.bug_id;


--
-- TOC entry 3267 (class 2604 OID 16421)
-- Name: bug_info bug_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bug_info ALTER COLUMN bug_id SET DEFAULT nextval('public.buginfo_bugid_seq'::regclass);


--
-- TOC entry 3271 (class 2606 OID 16423)
-- Name: bug_info buginfo_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bug_info
    ADD CONSTRAINT buginfo_pk PRIMARY KEY (bug_id);


-- Completed on 2026-04-15 17:18:40

--
-- PostgreSQL database dump complete
--

\unrestrict boS2xgh1UBCGnzjPpHTfnrD1TQSxc0ZOLJwrlffBXY26bkCXo5sCczhAYpNaepj

INSERT INTO public.bug_info (common_name, genus, flying, limb_count, color) VALUES
('Ant', 'Formica', false, 6, 'Black'),
('Mosquito', 'Culex', true, 6, 'Gray'),
('House Fly', 'Musca', true, 6, 'Black'),
('Cockroach', 'Periplaneta', false, 6, 'Brown'),
('Grasshopper', 'Melanoplus', true, 6, 'Green'),
('Aphid', 'Aphis', false, 6, 'Green'),
('Beetle', 'Coleoptera', true, 6, 'Brown'),
('Stink Bug', 'Halyomorpha', true, 6, 'Brown'),
('Yellowjacket', 'Vespula', true, 6, 'Yellow/Black'),
('Wasp', 'Polistes', true, 6, 'Yellow/Black'),
('Hornet', 'Vespa', true, 6, 'Brown/Yellow'),
('Butterfly', 'Danaus', true, 6, 'Orange/Black'),
('Moth', 'Noctuidae', true, 6, 'Brown'),
('Caterpillar', 'Lepidoptera', false, 6, 'Green'),
('Black Widow Spider', 'Latrodectus', false, 8, 'Black'),
('Wolf Spider', 'Lycosidae', false, 8, 'Brown'),
('Tick', 'Ixodes', false, 8, 'Brown'),
('Earwig', 'Dermaptera', false, 6, 'Brown'),
('Dragonfly', 'Anisoptera', true, 6, 'Blue/Green'),
('Fire Ant', 'Solenopsis', false, 6, 'Red');

CREATE INDEX IF NOT EXISTS idx_bug_info_common_name ON public.bug_info (common_name);
CREATE INDEX IF NOT EXISTS idx_bug_info_genus ON public.bug_info (genus);
CREATE INDEX IF NOT EXISTS idx_bug_info_color ON public.bug_info (color); 
