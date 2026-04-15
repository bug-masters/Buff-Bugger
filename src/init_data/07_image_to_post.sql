--
-- PostgreSQL database dump
--

\restrict YetgmNXzTvUIdQMJU4MfEclwh0cKPqs1H97iqaalf9rhpH84pnv4kRfjuiLZCcV

-- Dumped from database version 14.22 (Debian 14.22-1.pgdg13+1)
-- Dumped by pg_dump version 18.2

-- Started on 2026-04-15 17:26:59

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
-- TOC entry 217 (class 1259 OID 16451)
-- Name: image_to_post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image_to_post (
    image_id bigint NOT NULL,
    post_id bigint NOT NULL
);


ALTER TABLE public.image_to_post OWNER TO postgres;

--
-- TOC entry 3270 (class 1259 OID 16459)
-- Name: fki_image_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_image_id_fk ON public.image_to_post USING btree (image_id);


--
-- TOC entry 3271 (class 1259 OID 16465)
-- Name: fki_post_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_post_id_fk ON public.image_to_post USING btree (post_id);


--
-- TOC entry 3272 (class 2606 OID 16454)
-- Name: image_to_post image_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_to_post
    ADD CONSTRAINT image_id_fk FOREIGN KEY (image_id) REFERENCES public.image_store(id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- TOC entry 3273 (class 2606 OID 16460)
-- Name: image_to_post post_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_to_post
    ADD CONSTRAINT post_id_fk FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


-- Completed on 2026-04-15 17:26:59

--
-- PostgreSQL database dump complete
--

\unrestrict YetgmNXzTvUIdQMJU4MfEclwh0cKPqs1H97iqaalf9rhpH84pnv4kRfjuiLZCcV

