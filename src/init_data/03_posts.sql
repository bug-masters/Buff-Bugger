--
-- PostgreSQL database dump
--

\restrict USsMjPzys1u29umuXqlncVDAZhPL6oLLC7n5pw3FUm8vIClz8CRduUEySW2HrJK

-- Dumped from database version 14.22 (Debian 14.22-1.pgdg13+1)
-- Dumped by pg_dump version 18.2

-- Started on 2026-04-15 17:16:29

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
-- TOC entry 212 (class 1259 OID 16406)
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id bigint NOT NULL,
    coords point NOT NULL,
    bug_id bigint NOT NULL,
    comments text
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16409)
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.post_id_seq OWNER TO postgres;

--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 213
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.posts.id;


--
-- TOC entry 3267 (class 2604 OID 16410)
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- TOC entry 3270 (class 2606 OID 16412)
-- Name: posts post_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT post_pk PRIMARY KEY (id);


--
-- TOC entry 3268 (class 1259 OID 16448)
-- Name: fki_bug_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_bug_id_fk ON public.posts USING btree (bug_id);


--
-- TOC entry 3271 (class 2606 OID 16443)
-- Name: posts bug_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT bug_id_fk FOREIGN KEY (bug_id) REFERENCES public.bug_info(bug_id) NOT VALID;


-- Completed on 2026-04-15 17:16:29

--
-- PostgreSQL database dump complete
--

\unrestrict USsMjPzys1u29umuXqlncVDAZhPL6oLLC7n5pw3FUm8vIClz8CRduUEySW2HrJK

