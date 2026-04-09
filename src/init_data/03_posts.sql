--
-- Name: posts; Type: TABLE; Schema: public
--

CREATE TABLE public.posts (
    id bigint NOT NULL
);

CREATE SEQUENCE public.post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.post_id_seq OWNED BY public.posts.id;

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT post_pk PRIMARY KEY (id);
