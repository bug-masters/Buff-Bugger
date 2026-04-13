--
-- PostgreSQL database dump
--

\restrict cv1JqXEZi01gJvbu4GEQxyXhviTA8aJUoE2WDBOYsMASbJU6rljqpvRF54dca1m

-- Dumped from database version 14.22 (Debian 14.22-1.pgdg13+1)
-- Dumped by pg_dump version 18.2

-- Started on 2026-04-13 02:27:08

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
-- TOC entry 209 (class 1259 OID 16385)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    username character varying(50) NOT NULL,
    password character varying(60) NOT NULL,
    email character varying(254) NOT NULL
);


--
-- TOC entry 3268 (class 2606 OID 16442)
-- Name: users user_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_email_unique UNIQUE (email);


--
-- TOC entry 3270 (class 2606 OID 16389)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (username);


-- Completed on 2026-04-13 02:27:08

--
-- PostgreSQL database dump complete
--

\unrestrict cv1JqXEZi01gJvbu4GEQxyXhviTA8aJUoE2WDBOYsMASbJU6rljqpvRF54dca1m

