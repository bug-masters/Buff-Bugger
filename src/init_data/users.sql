--
-- PostgreSQL database dump
--

\restrict cuC7aS0msNDGKxn8JdqP7pZNFEUcgds24M4lXlLqkUyKkUKbSX7Q87yyo8REYsZ

-- Dumped from database version 14.20 (Debian 14.20-1.pgdg13+1)
-- Dumped by pg_dump version 18.2

-- Started on 2026-04-08 03:41:43

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
-- TOC entry 209 (class 1259 OID 16385)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    username character varying(50) NOT NULL,
    password character varying(60) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 209
-- Name: TABLE users; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.users IS 'should ONLY hold login info, everything else put somewhere else';


--
-- TOC entry 3268 (class 2606 OID 16389)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (username);



-- Completed on 2026-04-08 03:41:43

--
-- PostgreSQL database dump complete
--

\unrestrict cuC7aS0msNDGKxn8JdqP7pZNFEUcgds24M4lXlLqkUyKkUKbSX7Q87yyo8REYsZ

