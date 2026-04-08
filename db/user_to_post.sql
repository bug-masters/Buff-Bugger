--
-- PostgreSQL database dump
--

\restrict ZuliVdGYN84dwaTjRaTzlowxSVsnnczIJnhYxFJyBWkilcJfbzAs3DTQeilLiv5

-- Dumped from database version 14.20 (Debian 14.20-1.pgdg13+1)
-- Dumped by pg_dump version 18.2

-- Started on 2026-04-08 03:41:22

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
-- TOC entry 216 (class 1259 OID 16450)
-- Name: user_to_post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_to_post (
    user_id character varying(50) NOT NULL,
    post_id bigint NOT NULL
);


ALTER TABLE public.user_to_post OWNER TO postgres;

--
-- TOC entry 3267 (class 2606 OID 16460)
-- Name: user_to_post post_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_to_post
    ADD CONSTRAINT post_id_fk FOREIGN KEY (post_id) REFERENCES public.posts(id) NOT VALID;


--
-- TOC entry 3268 (class 2606 OID 16453)
-- Name: user_to_post user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_to_post
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(username) NOT VALID;


-- Completed on 2026-04-08 03:41:23

--
-- PostgreSQL database dump complete
--

\unrestrict ZuliVdGYN84dwaTjRaTzlowxSVsnnczIJnhYxFJyBWkilcJfbzAs3DTQeilLiv5

