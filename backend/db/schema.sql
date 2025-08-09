--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-08-09 21:34:49

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

--
-- TOC entry 862 (class 1247 OID 17200)
-- Name: enum_ComponentLogs_changeType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_ComponentLogs_changeType" AS ENUM (
    'inward',
    'outward'
);


ALTER TYPE public."enum_ComponentLogs_changeType" OWNER TO postgres;

--
-- TOC entry 871 (class 1247 OID 17250)
-- Name: enum_Notifications_severity; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Notifications_severity" AS ENUM (
    'low',
    'medium',
    'high',
    'critical'
);


ALTER TYPE public."enum_Notifications_severity" OWNER TO postgres;

--
-- TOC entry 868 (class 1247 OID 17245)
-- Name: enum_Notifications_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Notifications_type" AS ENUM (
    'low_stock',
    'old_stock'
);


ALTER TYPE public."enum_Notifications_type" OWNER TO postgres;

--
-- TOC entry 856 (class 1247 OID 17182)
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'Admin',
    'User'
);


ALTER TYPE public."enum_Users_role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 17206)
-- Name: ComponentLogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ComponentLogs" (
    id integer NOT NULL,
    "changeType" public."enum_ComponentLogs_changeType",
    quantity integer,
    reason character varying(255),
    project character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    "componentId" integer
);


ALTER TABLE public."ComponentLogs" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17205)
-- Name: ComponentLogs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ComponentLogs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ComponentLogs_id_seq" OWNER TO postgres;

--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 221
-- Name: ComponentLogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ComponentLogs_id_seq" OWNED BY public."ComponentLogs".id;


--
-- TOC entry 218 (class 1259 OID 17173)
-- Name: Components; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Components" (
    id integer NOT NULL,
    name character varying(255),
    manufacturer character varying(255),
    "partNumber" character varying(255),
    description text,
    quantity integer,
    location character varying(255),
    "unitPrice" double precision,
    "datasheetLink" character varying(255),
    category character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "criticalThreshold" integer DEFAULT 10 NOT NULL
);


ALTER TABLE public."Components" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 17172)
-- Name: Components_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Components_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Components_id_seq" OWNER TO postgres;

--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 217
-- Name: Components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Components_id_seq" OWNED BY public."Components".id;


--
-- TOC entry 224 (class 1259 OID 17260)
-- Name: Notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notifications" (
    id integer NOT NULL,
    type public."enum_Notifications_type" NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    "componentId" integer,
    "userId" integer,
    severity public."enum_Notifications_severity" DEFAULT 'medium'::public."enum_Notifications_severity",
    "isRead" boolean DEFAULT false,
    "isEmailSent" boolean DEFAULT false,
    metadata json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Notifications" OWNER TO postgres;

--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN "Notifications".type; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Notifications".type IS 'Type of notification: low_stock or old_stock';


--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN "Notifications".title; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Notifications".title IS 'Notification title';


--
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN "Notifications".message; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Notifications".message IS 'Detailed notification message';


--
-- TOC entry 4959 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN "Notifications"."componentId"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Notifications"."componentId" IS 'Related component ID if applicable';


--
-- TOC entry 4960 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN "Notifications"."userId"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Notifications"."userId" IS 'Target user ID, null for all users';


--
-- TOC entry 4961 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN "Notifications".severity; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Notifications".severity IS 'Notification severity level';


--
-- TOC entry 4962 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN "Notifications"."isRead"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Notifications"."isRead" IS 'Whether the notification has been read';


--
-- TOC entry 4963 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN "Notifications"."isEmailSent"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Notifications"."isEmailSent" IS 'Whether email notification has been sent';


--
-- TOC entry 4964 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN "Notifications".metadata; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Notifications".metadata IS 'Additional metadata like component details, quantities, etc.';


--
-- TOC entry 223 (class 1259 OID 17259)
-- Name: Notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Notifications_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Notifications_id_seq" OWNER TO postgres;

--
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 223
-- Name: Notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Notifications_id_seq" OWNED BY public."Notifications".id;


--
-- TOC entry 220 (class 1259 OID 17188)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role public."enum_Users_role" DEFAULT 'User'::public."enum_Users_role" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17187)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 219
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 4773 (class 2604 OID 17209)
-- Name: ComponentLogs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComponentLogs" ALTER COLUMN id SET DEFAULT nextval('public."ComponentLogs_id_seq"'::regclass);


--
-- TOC entry 4769 (class 2604 OID 17176)
-- Name: Components id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Components" ALTER COLUMN id SET DEFAULT nextval('public."Components_id_seq"'::regclass);


--
-- TOC entry 4774 (class 2604 OID 17263)
-- Name: Notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications" ALTER COLUMN id SET DEFAULT nextval('public."Notifications_id_seq"'::regclass);


--
-- TOC entry 4771 (class 2604 OID 17191)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 4946 (class 0 OID 17206)
-- Dependencies: 222
-- Data for Name: ComponentLogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ComponentLogs" (id, "changeType", quantity, reason, project, "createdAt", "updatedAt", "userId", "componentId") FROM stdin;
7	inward	200	felt like buying bro		2025-08-09 15:44:28.902+05:30	2025-08-09 15:44:28.902+05:30	\N	1
13	inward	20	Excess		2025-08-09 17:31:49.912+05:30	2025-08-09 17:31:49.912+05:30	\N	22
14	inward	20	Excess Supply		2025-08-09 17:40:09.231+05:30	2025-08-09 17:40:09.231+05:30	\N	10
1	inward	10	Restocked from supplier	Robotics Lab	2025-08-04 15:40:35.604+05:30	2025-08-04 15:40:35.604+05:30	\N	1
2	inward	10	Initial stock	General Inventory	2025-08-09 15:36:13.942+05:30	2025-08-09 15:36:13.942+05:30	\N	1
3	outward	3	Project: Smart Home System	Smart Home	2025-08-09 15:36:13.95+05:30	2025-08-09 15:36:13.95+05:30	\N	1
4	inward	5	Restock	General Inventory	2025-08-09 15:36:13.953+05:30	2025-08-09 15:36:13.953+05:30	\N	2
5	inward	2	New project requirement	LED Art Installation	2025-08-09 15:36:13.955+05:30	2025-08-09 15:36:13.955+05:30	\N	3
6	inward	8	Replenishment	General Inventory	2025-08-09 15:36:13.956+05:30	2025-08-09 15:36:13.956+05:30	\N	1
8	inward	10	Initial stock	General Inventory	2025-08-09 16:47:21.864+05:30	2025-08-09 16:47:21.864+05:30	\N	2
9	outward	3	Project: Smart Home System	Smart Home	2025-08-09 16:47:21.872+05:30	2025-08-09 16:47:21.872+05:30	\N	2
10	inward	5	Restock	General Inventory	2025-08-09 16:47:21.873+05:30	2025-08-09 16:47:21.873+05:30	\N	3
11	inward	2	New project requirement	LED Art Installation	2025-08-09 16:47:21.875+05:30	2025-08-09 16:47:21.875+05:30	\N	4
12	inward	8	Replenishment	General Inventory	2025-08-09 16:47:21.876+05:30	2025-08-09 16:47:21.876+05:30	\N	2
\.


--
-- TOC entry 4942 (class 0 OID 17173)
-- Dependencies: 218
-- Data for Name: Components; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Components" (id, name, manufacturer, "partNumber", description, quantity, location, "unitPrice", "datasheetLink", category, "createdAt", "updatedAt", "criticalThreshold") FROM stdin;
22	NE555 Timer IC	Texas Instruments	NE555P	Precision Timer IC	100	IC-Box-F1	8	\N	Integrated Circuits (ICs)	2025-08-09 16:47:21.774+05:30	2025-08-09 17:31:49.907+05:30	20
42	Rubber	Faber	1112		51	Stationary	\N			2025-08-09 17:32:09.325+05:30	2025-08-09 17:32:09.325+05:30	10
2	Capacitor 5uF	James	123		2000	Trash	20			2025-08-09 15:13:19.479+05:30	2025-08-09 15:13:19.479+05:30	10
3	Test	James	2		1	bin	1			2025-08-09 15:20:41.247+05:30	2025-08-09 15:20:41.247+05:30	10
4	Arduino Uno	Arduino	A000066	Microcontroller board based on ATmega328P	15	Shelf A1	22	\N	Microcontrollers	2025-08-09 15:36:13.892+05:30	2025-08-09 15:36:13.892+05:30	5
5	Raspberry Pi 4 Model B	Raspberry Pi Foundation	RPI4-MODBP-4GB	Single-board computer with 4GB RAM	8	Shelf B2	55	\N	Single Board Computers	2025-08-09 15:36:13.912+05:30	2025-08-09 15:36:13.912+05:30	10
6	LED Strip WS2812B	Worldsemi	WS2812B-5M	5-meter RGB LED strip with 300 LEDs	3	Shelf C3	18.5	\N	LEDs	2025-08-09 15:36:13.919+05:30	2025-08-09 15:36:13.919+05:30	5
7	ESP32 Development Board	Espressif	ESP32-DEVKIT	WiFi and Bluetooth enabled microcontroller	2	Shelf A2	12	\N	Microcontrollers	2025-08-09 15:36:13.925+05:30	2025-08-09 15:36:13.925+05:30	3
8	Breadboard 830 Points	Generic	BB-830	Solderless breadboard for prototyping	1	Shelf B3	8.5	\N	Prototyping	2025-08-09 15:36:13.929+05:30	2025-08-09 15:36:13.929+05:30	2
9	Jumper Wires Set	Generic	JW-40M	40-piece male-to-male jumper wire set	0	Shelf C1	5	\N	Connectors	2025-08-09 15:36:13.937+05:30	2025-08-09 15:36:13.937+05:30	1
1	Resistor	\N	\N	\N	220	Box A1	\N	\N	\N	2025-08-04 15:39:20.868+05:30	2025-08-09 15:44:28.87+05:30	10
11	Resistor (1k Ohm, 1/4W)	Generic	R1K_1/4W	Carbon Film, 5% Tolerance	500	R-Shelf-A1	0.5	\N	Resistors	2025-08-09 16:47:21.714+05:30	2025-08-09 16:47:21.714+05:30	100
12	Resistor (10k Ohm, 1/4W)	Generic	R10K_1/4W	Carbon Film, 5% Tolerance	500	R-Shelf-A1	0.5	\N	Resistors	2025-08-09 16:47:21.722+05:30	2025-08-09 16:47:21.722+05:30	100
13	Resistor (4.7 Ohm, 1W)	Generic	R4.7_1W	Metal Film, 1% Tolerance	150	R-Shelf-A2	1.2	\N	Resistors	2025-08-09 16:47:21.727+05:30	2025-08-09 16:47:21.727+05:30	30
14	Ceramic Cap (0.1uF, 50V)	Generic	C0.1UF_50V_CER	Ceramic Disc Capacitor	800	C-Bin-B1	0.8	\N	Capacitors	2025-08-09 16:47:21.732+05:30	2025-08-09 16:47:21.732+05:30	200
15	Electrolytic Cap (100uF, 25V)	Generic	C100UF_25V_EL	Radial Electrolytic Capacitor	200	C-Bin-B2	2.5	\N	Capacitors	2025-08-09 16:47:21.74+05:30	2025-08-09 16:47:21.74+05:30	50
16	Tantalum Cap (10uF, 16V)	KEMET	T491A106K016AT	SMD Tantalum Capacitor	100	C-Bin-B3	5	\N	Capacitors	2025-08-09 16:47:21.743+05:30	2025-08-09 16:47:21.743+05:30	20
17	Inductor (10uH)	Generic	L10UH	Radial Lead Inductor	100	L-Bin-C1	3	\N	Inductors	2025-08-09 16:47:21.75+05:30	2025-08-09 16:47:21.75+05:30	25
18	1N4007 Diode	Fairchild	1N4007	Rectifier Diode, 1A, 1000V	300	D-Bin-D1	1	\N	Diodes	2025-08-09 16:47:21.757+05:30	2025-08-09 16:47:21.757+05:30	75
19	Zener Diode (5.1V, 0.5W)	ON Semiconductor	1N5231B	Zener Diode	150	D-Bin-D2	1.5	\N	Diodes	2025-08-09 16:47:21.761+05:30	2025-08-09 16:47:21.761+05:30	30
20	NPN Transistor (BC547)	NXP	BC547B	NPN BJT, General Purpose	200	T-Tray-E1	1.2	\N	Transistors	2025-08-09 16:47:21.765+05:30	2025-08-09 16:47:21.765+05:30	50
21	MOSFET (IRF540N)	Infineon	IRF540N	N-Channel Power MOSFET	50	T-Tray-E2	25	\N	Transistors	2025-08-09 16:47:21.771+05:30	2025-08-09 16:47:21.771+05:30	10
23	LM358 Op-Amp	STMicroelectronics	LM358N	Dual Op-Amp	100	IC-Box-F2	6	\N	Integrated Circuits (ICs)	2025-08-09 16:47:21.778+05:30	2025-08-09 16:47:21.778+05:30	25
24	ATmega328P (DIP)	Microchip	ATMEGA328P-PU	Microcontroller, 8-bit	30	IC-Box-F3	150	\N	Integrated Circuits (ICs)	2025-08-09 16:47:21.782+05:30	2025-08-09 16:47:21.782+05:30	5
25	ESP32-WROOM-32U	Espressif	ESP32-WROOM-32U	Wi-Fi & Bluetooth Module	20	IC-Box-F4	200	\N	Integrated Circuits (ICs)	2025-08-09 16:47:21.788+05:30	2025-08-09 16:47:21.788+05:30	3
26	Male Header (2.54mm, 40-pin)	Generic	HDR-M-2.54-40	Single Row Pin Header	100	Conn-Drawer-G1	3.5	\N	Connectors	2025-08-09 16:47:21.791+05:30	2025-08-09 16:47:21.791+05:30	20
27	JST-XH Connector (2-pin)	JST	B2B-XH-A(LF)(SN)	Through-hole, 2-pin	50	Conn-Drawer-G2	4	\N	Connectors	2025-08-09 16:47:21.795+05:30	2025-08-09 16:47:21.795+05:30	10
28	DHT11 Temperature/Humidity	Aosong	DHT11	Digital Temperature & Humidity Sensor	15	Sensor-Bin-H1	50	\N	Sensors	2025-08-09 16:47:21.798+05:30	2025-08-09 16:47:21.798+05:30	3
29	Photoresistor (LDR)	Generic	GL5516	Light Dependent Resistor	30	Sensor-Bin-H2	7	\N	Sensors	2025-08-09 16:47:21.805+05:30	2025-08-09 16:47:21.805+05:30	5
30	Arduino Uno R3	Arduino	A000066	Development Board	5	DevBoard-Rack-I1	800	\N	Microcontrollers/Development Boards	2025-08-09 16:47:21.809+05:30	2025-08-09 16:47:21.809+05:30	1
31	Raspberry Pi Zero W	Raspberry Pi Found.	RPI0W	Single-board Computer	3	DevBoard-Rack-I2	1200	\N	Microcontrollers/Development Boards	2025-08-09 16:47:21.812+05:30	2025-08-09 16:47:21.812+05:30	1
32	Tactile Push Button (6x6mm)	Generic	BTN-TACT-6X6	Momentary Tactile Switch	100	Switch-Box-J1	1	\N	Switches/Buttons	2025-08-09 16:47:21.817+05:30	2025-08-09 16:47:21.817+05:30	25
33	SPDT Slide Switch	Generic	SW-SPDT-SLIDE	Single Pole Double Throw Slide Switch	40	Switch-Box-J2	3	\N	Switches/Buttons	2025-08-09 16:47:21.823+05:30	2025-08-09 16:47:21.823+05:30	10
34	Red LED (5mm)	Generic	LED-RED-5MM	Standard Red LED	200	LED-Tray-K1	0.8	\N	LEDs/Displays	2025-08-09 16:47:21.827+05:30	2025-08-09 16:47:21.827+05:30	50
35	16x2 LCD Display	Generic	LCD1602	Character LCD Module	10	LCD-Box-K2	150	\N	LEDs/Displays	2025-08-09 16:47:21.83+05:30	2025-08-09 16:47:21.83+05:30	2
36	Jumper Wires (M-M, 40pc)	Generic	JMP-MM-40	Male-to-Male Jumper Wires, assorted	10	Cable-Bag-L1	80	\N	Cables/Wires	2025-08-09 16:47:21.835+05:30	2025-08-09 16:47:21.835+05:30	2
37	Hook-up Wire (22AWG, Red)	Generic	WIRE-22AWG-RED	Solid Core Hook-up Wire, 10m roll	5	Cable-Bag-L2	150	\N	Cables/Wires	2025-08-09 16:47:21.84+05:30	2025-08-09 16:47:21.84+05:30	1
38	M3 Screws (10mm)	Generic	SCR-M3-10MM	Phillips Head, Steel	200	Mech-Bin-M1	0.5	\N	Mechanical Parts/Hardware	2025-08-09 16:47:21.842+05:30	2025-08-09 16:47:21.842+05:30	50
39	Brass Standoffs (M3, 10mm)	Generic	STDOFF-M3-10MM	Male-Female Standoff	100	Mech-Bin-M2	2	\N	Mechanical Parts/Hardware	2025-08-09 16:47:21.846+05:30	2025-08-09 16:47:21.846+05:30	20
40	Solder Wire (0.8mm)	Generic	SOLDER-0.8MM	Lead-free Solder, 100g roll	5	Misc-Shelf-N1	300	\N	Miscellaneous Lab Supplies	2025-08-09 16:47:21.851+05:30	2025-08-09 16:47:21.851+05:30	1
41	Breadboard (Full Size)	Generic	BRDBRD-FULL	830 Tie Points	10	Misc-Shelf-N2	70	\N	Miscellaneous Lab Supplies	2025-08-09 16:47:21.857+05:30	2025-08-09 16:47:21.857+05:30	2
10	Resistor (100 Ohm, 1/4W)	Generic	R100_1/4W	Carbon Film, 5% Tolerance	520	R-Shelf-A1	0.5	\N	Resistors	2025-08-09 16:47:21.696+05:30	2025-08-09 17:40:09.222+05:30	100
\.


--
-- TOC entry 4948 (class 0 OID 17260)
-- Dependencies: 224
-- Data for Name: Notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notifications" (id, type, title, message, "componentId", "userId", severity, "isRead", "isEmailSent", metadata, "createdAt", "updatedAt") FROM stdin;
1	low_stock	Low Stock Alert: Jumper Wires Set	Component "Jumper Wires Set" is running low. Current quantity: 0, Critical threshold: 1. Location: Shelf C1	9	\N	critical	t	f	{"currentQuantity":0,"criticalThreshold":1,"location":"Shelf C1","partNumber":"JW-40M"}	2025-08-09 16:22:33.067+05:30	2025-08-09 16:37:44.489+05:30
2	low_stock	Low Stock Alert: Test	Component "Test" is running low. Current quantity: 1, Critical threshold: 10. Location: bin	3	\N	high	t	f	{"currentQuantity":1,"criticalThreshold":10,"location":"bin","partNumber":"2"}	2025-08-09 16:22:33.097+05:30	2025-08-09 16:37:44.489+05:30
3	low_stock	Low Stock Alert: Breadboard 830 Points	Component "Breadboard 830 Points" is running low. Current quantity: 1, Critical threshold: 2. Location: Shelf B3	8	\N	medium	t	f	{"currentQuantity":1,"criticalThreshold":2,"location":"Shelf B3","partNumber":"BB-830"}	2025-08-09 16:22:33.107+05:30	2025-08-09 16:37:44.489+05:30
4	low_stock	Low Stock Alert: ESP32 Development Board	Component "ESP32 Development Board" is running low. Current quantity: 2, Critical threshold: 3. Location: Shelf A2	7	\N	low	t	f	{"currentQuantity":2,"criticalThreshold":3,"location":"Shelf A2","partNumber":"ESP32-DEVKIT"}	2025-08-09 16:22:33.117+05:30	2025-08-09 16:37:44.489+05:30
5	low_stock	Low Stock Alert: LED Strip WS2812B	Component "LED Strip WS2812B" is running low. Current quantity: 3, Critical threshold: 5. Location: Shelf C3	6	\N	low	t	f	{"currentQuantity":3,"criticalThreshold":5,"location":"Shelf C3","partNumber":"WS2812B-5M"}	2025-08-09 16:22:33.127+05:30	2025-08-09 16:37:44.489+05:30
6	low_stock	Low Stock Alert: Raspberry Pi 4 Model B	Component "Raspberry Pi 4 Model B" is running low. Current quantity: 8, Critical threshold: 10. Location: Shelf B2	5	\N	low	t	f	{"currentQuantity":8,"criticalThreshold":10,"location":"Shelf B2","partNumber":"RPI4-MODBP-4GB"}	2025-08-09 16:22:33.136+05:30	2025-08-09 16:37:44.489+05:30
7	low_stock	Low Stock Alert: Jumper Wires Set	Component "Jumper Wires Set" is running low. Current quantity: 0, Critical threshold: 1. Location: Shelf C1	9	\N	critical	t	f	{"currentQuantity":0,"criticalThreshold":1,"location":"Shelf C1","partNumber":"JW-40M"}	2025-08-09 16:45:10.743+05:30	2025-08-09 17:31:26.821+05:30
8	low_stock	Low Stock Alert: Test	Component "Test" is running low. Current quantity: 1, Critical threshold: 10. Location: bin	3	\N	high	t	f	{"currentQuantity":1,"criticalThreshold":10,"location":"bin","partNumber":"2"}	2025-08-09 16:45:10.764+05:30	2025-08-09 17:31:26.821+05:30
9	low_stock	Low Stock Alert: Breadboard 830 Points	Component "Breadboard 830 Points" is running low. Current quantity: 1, Critical threshold: 2. Location: Shelf B3	8	\N	medium	t	f	{"currentQuantity":1,"criticalThreshold":2,"location":"Shelf B3","partNumber":"BB-830"}	2025-08-09 16:45:10.772+05:30	2025-08-09 17:31:26.821+05:30
10	low_stock	Low Stock Alert: ESP32 Development Board	Component "ESP32 Development Board" is running low. Current quantity: 2, Critical threshold: 3. Location: Shelf A2	7	\N	low	t	f	{"currentQuantity":2,"criticalThreshold":3,"location":"Shelf A2","partNumber":"ESP32-DEVKIT"}	2025-08-09 16:45:10.776+05:30	2025-08-09 17:31:26.821+05:30
11	low_stock	Low Stock Alert: LED Strip WS2812B	Component "LED Strip WS2812B" is running low. Current quantity: 3, Critical threshold: 5. Location: Shelf C3	6	\N	low	t	f	{"currentQuantity":3,"criticalThreshold":5,"location":"Shelf C3","partNumber":"WS2812B-5M"}	2025-08-09 16:45:10.782+05:30	2025-08-09 17:31:26.821+05:30
12	low_stock	Low Stock Alert: Raspberry Pi 4 Model B	Component "Raspberry Pi 4 Model B" is running low. Current quantity: 8, Critical threshold: 10. Location: Shelf B2	5	\N	low	t	f	{"currentQuantity":8,"criticalThreshold":10,"location":"Shelf B2","partNumber":"RPI4-MODBP-4GB"}	2025-08-09 16:45:10.788+05:30	2025-08-09 17:31:26.821+05:30
18	low_stock	Low Stock Alert: Raspberry Pi 4 Model B	Component "Raspberry Pi 4 Model B" is running low. Current quantity: 8, Critical threshold: 10. Location: Shelf B2	5	\N	low	t	f	{"currentQuantity":8,"criticalThreshold":10,"location":"Shelf B2","partNumber":"RPI4-MODBP-4GB"}	2025-08-09 17:40:49.402+05:30	2025-08-09 17:41:04.981+05:30
17	low_stock	Low Stock Alert: LED Strip WS2812B	Component "LED Strip WS2812B" is running low. Current quantity: 3, Critical threshold: 5. Location: Shelf C3	6	\N	low	t	f	{"currentQuantity":3,"criticalThreshold":5,"location":"Shelf C3","partNumber":"WS2812B-5M"}	2025-08-09 17:40:49.399+05:30	2025-08-09 17:41:06.909+05:30
16	low_stock	Low Stock Alert: ESP32 Development Board	Component "ESP32 Development Board" is running low. Current quantity: 2, Critical threshold: 3. Location: Shelf A2	7	\N	low	t	f	{"currentQuantity":2,"criticalThreshold":3,"location":"Shelf A2","partNumber":"ESP32-DEVKIT"}	2025-08-09 17:40:49.394+05:30	2025-08-09 17:41:08.296+05:30
21	low_stock	Low Stock Alert: Raspberry Pi 4 Model B	Component "Raspberry Pi 4 Model B" is running low. Current quantity: 8, Critical threshold: 10. Location: Shelf B2	5	\N	low	t	f	{"currentQuantity":8,"criticalThreshold":10,"location":"Shelf B2","partNumber":"RPI4-MODBP-4GB"}	2025-08-09 17:43:52.27+05:30	2025-08-09 21:26:12.068+05:30
20	low_stock	Low Stock Alert: LED Strip WS2812B	Component "LED Strip WS2812B" is running low. Current quantity: 3, Critical threshold: 5. Location: Shelf C3	6	\N	low	t	f	{"currentQuantity":3,"criticalThreshold":5,"location":"Shelf C3","partNumber":"WS2812B-5M"}	2025-08-09 17:43:52.265+05:30	2025-08-09 21:26:16.257+05:30
19	low_stock	Low Stock Alert: ESP32 Development Board	Component "ESP32 Development Board" is running low. Current quantity: 2, Critical threshold: 3. Location: Shelf A2	7	\N	low	t	f	{"currentQuantity":2,"criticalThreshold":3,"location":"Shelf A2","partNumber":"ESP32-DEVKIT"}	2025-08-09 17:43:52.255+05:30	2025-08-09 21:26:17.335+05:30
15	low_stock	Low Stock Alert: Breadboard 830 Points	Component "Breadboard 830 Points" is running low. Current quantity: 1, Critical threshold: 2. Location: Shelf B3	8	\N	medium	t	f	{"currentQuantity":1,"criticalThreshold":2,"location":"Shelf B3","partNumber":"BB-830"}	2025-08-09 17:40:49.388+05:30	2025-08-09 21:26:17.493+05:30
14	low_stock	Low Stock Alert: Test	Component "Test" is running low. Current quantity: 1, Critical threshold: 10. Location: bin	3	\N	high	t	f	{"currentQuantity":1,"criticalThreshold":10,"location":"bin","partNumber":"2"}	2025-08-09 17:40:49.384+05:30	2025-08-09 21:26:17.667+05:30
13	low_stock	Low Stock Alert: Jumper Wires Set	Component "Jumper Wires Set" is running low. Current quantity: 0, Critical threshold: 1. Location: Shelf C1	9	\N	critical	t	f	{"currentQuantity":0,"criticalThreshold":1,"location":"Shelf C1","partNumber":"JW-40M"}	2025-08-09 17:40:49.368+05:30	2025-08-09 21:26:17.837+05:30
\.


--
-- TOC entry 4944 (class 0 OID 17188)
-- Dependencies: 220
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, username, password, role, "createdAt", "updatedAt") FROM stdin;
7	testadmin	$2b$10$piuqhLbO2.2bO1TANe28MOzS7awlP7WJXxF2D46hEpVQFW7D9Smxe	Admin	2025-08-09 17:49:20.686+05:30	2025-08-09 17:49:20.686+05:30
8	testuser	$2b$10$A8JuiqmqbA0P7ey4oFsPHOSBs9dhhz9KSlDWtNmLTE3KGB0lmNOmG	User	2025-08-09 17:56:20.349+05:30	2025-08-09 17:56:20.349+05:30
\.


--
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 221
-- Name: ComponentLogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ComponentLogs_id_seq"', 14, true);


--
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 217
-- Name: Components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Components_id_seq"', 42, true);


--
-- TOC entry 4969 (class 0 OID 0)
-- Dependencies: 223
-- Name: Notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Notifications_id_seq"', 21, true);


--
-- TOC entry 4970 (class 0 OID 0)
-- Dependencies: 219
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 8, true);


--
-- TOC entry 4789 (class 2606 OID 17213)
-- Name: ComponentLogs ComponentLogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComponentLogs"
    ADD CONSTRAINT "ComponentLogs_pkey" PRIMARY KEY (id);


--
-- TOC entry 4779 (class 2606 OID 17180)
-- Name: Components Components_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Components"
    ADD CONSTRAINT "Components_pkey" PRIMARY KEY (id);


--
-- TOC entry 4791 (class 2606 OID 17270)
-- Name: Notifications Notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_pkey" PRIMARY KEY (id);


--
-- TOC entry 4781 (class 2606 OID 17196)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 4783 (class 2606 OID 17288)
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- TOC entry 4785 (class 2606 OID 17286)
-- Name: Users Users_username_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key1" UNIQUE (username);


--
-- TOC entry 4787 (class 2606 OID 17290)
-- Name: Users Users_username_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key2" UNIQUE (username);


--
-- TOC entry 4792 (class 2606 OID 17298)
-- Name: ComponentLogs ComponentLogs_componentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComponentLogs"
    ADD CONSTRAINT "ComponentLogs_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES public."Components"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4793 (class 2606 OID 17293)
-- Name: ComponentLogs ComponentLogs_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComponentLogs"
    ADD CONSTRAINT "ComponentLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4794 (class 2606 OID 17271)
-- Name: Notifications Notifications_componentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES public."Components"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4795 (class 2606 OID 17276)
-- Name: Notifications Notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2025-08-09 21:34:49

--
-- PostgreSQL database dump complete
--

