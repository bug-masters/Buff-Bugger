--
-- PostgreSQL database dump
--

\restrict etWCWXwNRQ7VHJlcKjPwYl2G0ZHLvgC8ebYq2ckU5CXSb61dWHEahLiSYWrsi8w

-- Dumped from database version 14.20 (Debian 14.20-1.pgdg13+1)
-- Dumped by pg_dump version 18.2

-- Started on 2026-04-08 03:40:07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 211 (class 1259 OID 16393)
-- Name: bug_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bug_info (
    bug_id bigint NOT NULL,
    common_name text NOT NULL,
    genus text NOT NULL,
    flying boolean DEFAULT false NOT NULL,
    limb_count smallint DEFAULT 0 NOT NULL,
    color text NOT NULL,
    photo_id bigint DEFAULT 0 NOT NULL
);


ALTER TABLE public.bug_info OWNER TO postgres;

--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 211
-- Name: TABLE bug_info; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.bug_info IS 'bug-dex table';


--
-- TOC entry 210 (class 1259 OID 16392)
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
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 210
-- Name: buginfo_bugid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.buginfo_bugid_seq OWNED BY public.bug_info.bug_id;


--
-- TOC entry 3267 (class 2604 OID 16396)
-- Name: bug_info bug_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bug_info ALTER COLUMN bug_id SET DEFAULT nextval('public.buginfo_bugid_seq'::regclass);


--
-- TOC entry 3272 (class 2606 OID 16402)
-- Name: bug_info buginfo_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bug_info
    ADD CONSTRAINT buginfo_pk PRIMARY KEY (bug_id);


--
-- TOC entry 3273 (class 1259 OID 16424)
-- Name: fki_photoid_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_photoid_fk ON public.bug_info USING btree (photo_id);


--
-- TOC entry 3274 (class 2606 OID 16425)
-- Name: bug_info photo_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bug_info
    ADD CONSTRAINT photo_id_fk FOREIGN KEY (photo_id) REFERENCES public.image_store(id) ON UPDATE CASCADE ON DELETE SET DEFAULT NOT VALID;


-- Completed on 2026-04-08 03:40:08

--
-- PostgreSQL database dump complete
--

\unrestrict etWCWXwNRQ7VHJlcKjPwYl2G0ZHLvgC8ebYq2ckU5CXSb61dWHEahLiSYWrsi8w

