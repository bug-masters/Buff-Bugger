--
-- PostgreSQL database dump
--

\restrict LvVnRIoyhFhRxZreAoihZ01cRQW8vDHm86cbT3cxUxPsHLJnA1DqyPeG4oKqVCW

-- Dumped from database version 14.22 (Debian 14.22-1.pgdg13+1)
-- Dumped by pg_dump version 18.2

-- Started on 2026-04-15 17:17:02

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
-- TOC entry 210 (class 1259 OID 16392)
-- Name: image_store; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image_store (
    id bigint NOT NULL,
    file text NOT NULL,
    uploading_user character varying(50) NOT NULL,
    format character varying(4) NOT NULL,
    attribution text NOT NULL,
    source_link text
);


ALTER TABLE public.image_store OWNER TO postgres;

--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN image_store.file; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.image_store.file IS 'filename';


--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN image_store.uploading_user; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.image_store.uploading_user IS 'track user who uploaded the image for moderation purposes, bug-dex images should go to an admin account';


--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN image_store.format; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.image_store.format IS 'image format';


--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN image_store.source_link; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.image_store.source_link IS 'only applicable if it''s a bug-dex image, the source should be linked for licensing restrictions and compliance checks';


--
-- TOC entry 211 (class 1259 OID 16397)
-- Name: imageStore_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."imageStore_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."imageStore_id_seq" OWNER TO postgres;

--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 211
-- Name: imageStore_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."imageStore_id_seq" OWNED BY public.image_store.id;


--
-- TOC entry 3267 (class 2604 OID 16398)
-- Name: image_store id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_store ALTER COLUMN id SET DEFAULT nextval('public."imageStore_id_seq"'::regclass);


--
-- TOC entry 3269 (class 2606 OID 16400)
-- Name: image_store image_store_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_store
    ADD CONSTRAINT image_store_pk PRIMARY KEY (id);


--
-- TOC entry 3270 (class 2606 OID 16401)
-- Name: image_store uploading_user_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_store
    ADD CONSTRAINT uploading_user_fk FOREIGN KEY (uploading_user) REFERENCES public.users(username) ON UPDATE CASCADE NOT VALID;


-- Completed on 2026-04-15 17:17:02

--
-- PostgreSQL database dump complete
--

\unrestrict LvVnRIoyhFhRxZreAoihZ01cRQW8vDHm86cbT3cxUxPsHLJnA1DqyPeG4oKqVCW

