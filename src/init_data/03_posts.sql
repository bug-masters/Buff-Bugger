--
-- PostgreSQL database dump
--

\restrict mEBg2MjbCvH4L3s2NFY0gdbPP5cmImV1OnTt0w71G8ZmAvracveIamEtli5IPiI

-- Dumped from database version 14.22 (Debian 14.22-1.pgdg13+1)
-- Dumped by pg_dump version 18.2

-- Started on 2026-04-13 03:48:03

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

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 16406)
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id bigint NOT NULL,
    coords point NOT NULL
);


--
-- TOC entry 213 (class 1259 OID 16409)
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 213
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.posts.id;


--
-- TOC entry 3267 (class 2604 OID 16410)
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- TOC entry 3269 (class 2606 OID 16412)
-- Name: posts post_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT post_pk PRIMARY KEY (id);


-- Completed on 2026-04-13 03:48:03

--
-- PostgreSQL database dump complete
--

\unrestrict mEBg2MjbCvH4L3s2NFY0gdbPP5cmImV1OnTt0w71G8ZmAvracveIamEtli5IPiI

