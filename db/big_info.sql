--
-- PostgreSQL database dump
--

\restrict vRJRKOKPwIF7Ej3feQbQvQAoJ9CRjW1lSYh94lF9MtM0UPbLWxRKF8oxu2chDXG

-- Dumped from database version 14.20 (Debian 14.20-1.pgdg13+1)
-- Dumped by pg_dump version 18.2

-- Started on 2026-04-08 03:09:00

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
    bugid bigint NOT NULL,
    commonname text NOT NULL,
    genus text NOT NULL,
    flying boolean DEFAULT false NOT NULL,
    limbcount smallint DEFAULT 0 NOT NULL,
    color text NOT NULL,
    photoattribution character varying NOT NULL,
    "photoId" bigint DEFAULT 0 NOT NULL
);


ALTER TABLE public.bug_info OWNER TO postgres;

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
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 210
-- Name: buginfo_bugid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.buginfo_bugid_seq OWNED BY public.bug_info.bugid;


--
-- TOC entry 3260 (class 2604 OID 16396)
-- Name: bug_info bugid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bug_info ALTER COLUMN bugid SET DEFAULT nextval('public.buginfo_bugid_seq'::regclass);


--
-- TOC entry 3265 (class 2606 OID 16402)
-- Name: bug_info buginfo_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bug_info
    ADD CONSTRAINT buginfo_pk PRIMARY KEY (bugid);


--
-- TOC entry 3266 (class 1259 OID 16424)
-- Name: fki_photoid_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_photoid_fk ON public.bug_info USING btree ("photoId");


--
-- TOC entry 3267 (class 2606 OID 16425)
-- Name: bug_info photo_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bug_info
    ADD CONSTRAINT photo_id_fk FOREIGN KEY ("photoId") REFERENCES public.image_store(id) ON UPDATE CASCADE ON DELETE SET DEFAULT NOT VALID;


-- Completed on 2026-04-08 03:09:00

--
-- PostgreSQL database dump complete
--

\unrestrict vRJRKOKPwIF7Ej3feQbQvQAoJ9CRjW1lSYh94lF9MtM0UPbLWxRKF8oxu2chDXG

