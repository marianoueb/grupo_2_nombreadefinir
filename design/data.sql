INSERT INTO user_types VALUES (1, 'User');
INSERT INTO user_types VALUES (2, 'Admin');
INSERT INTO user_types VALUES (3, 'Owner');

INSERT INTO users VALUES (DEFAULT, "Usuario", "Uno", "user@toolbox.com", 123, 1122334455, "default.png", 1);
INSERT INTO users VALUES (DEFAULT, "Administrador", "Uno", "admin@toolbox.com", 123, 1152334455, "default.png", 2);
INSERT INTO users VALUES (DEFAULT, "Creador", "Uno", "owner@toolbox.com", 123, 1182334455, "default.png", 3);

INSERT INTO categories VALUES (DEFAULT, 'Ferretería', 'fas fa-hammer');
INSERT INTO categories VALUES (DEFAULT, 'Pinturería', 'fas fa-paint-roller');
INSERT INTO categories VALUES (DEFAULT, 'Plomería', 'fas fa-sink');
INSERT INTO categories VALUES (DEFAULT, 'Jardinería', 'fas fa-fan');
INSERT INTO categories VALUES (DEFAULT, 'Maquinaria', 'fas fa-snowplow');

INSERT INTO brands VALUES (DEFAULT, 'Varios', 'varios-logo.jpg');
INSERT INTO brands VALUES (DEFAULT, 'Black & Decker', 'blackdecker-logo.jpg');
INSERT INTO brands VALUES (DEFAULT, 'Bremen', 'bremen-logo.jpg');
INSERT INTO brands VALUES (DEFAULT, 'Dogo', 'dogo-logo.jpg');
INSERT INTO brands VALUES (DEFAULT, 'Dubai', 'dubai-logo.jpg');

INSERT INTO products VALUES (DEFAULT, 'Alicate Bremen', 'Alicate C.oblicuo Bremen 7"', 954.27, 3, "alicate-7-bremen.jpg");
INSERT INTO products VALUES (DEFAULT, 'Balde', 'Balde plástico de albañil reforzado', 181.66, 1, "balde-plastico.jpg");
INSERT INTO products VALUES (DEFAULT, 'Caja de herramientas', 'Caja plastica 500x260x250 20.5″ t/metal.-2040', 3696.87, 4, "caja-plastica.jpg");
INSERT INTO products VALUES (DEFAULT, 'Calibre metálico', 'Calibre metálico importado cromado mate c/freno', 1462.74, 1, "calibre-metalico.jpg");
INSERT INTO products VALUES (DEFAULT, "Candado 32mm", "Candado bronceado Dubai 32mm", 309.30, 5, "candado-dubai-32mm.jpg");
INSERT INTO products VALUES (DEFAULT, 'Cinta métrica', 'Cinta métrica auto-frenante 3mx19mm Bremen', 1152.11, 3, "cinta-metrica-3m-bremen.jpg");
INSERT INTO products VALUES (DEFAULT, 'Hidrolavadora Black & Decker PW1370', 'HIDROLAVADORA ELÉCTRICA 1300 W • Marca: Black+Decker. • Modelo: Pw1370td. ESPECIFICACIONES - • Potencia: 1300w. • Caudal máximo: 6,5 L/min. • Caudal de trabajo: 5 L/min. • Presión máxima: 110 bar (1595 Psi) • Manguera: 3 m. • Cable: 5 m. • Apagado automático. • Almacenaje para accesorios. • Filtro de entrada de agua para más vida útil. • Origen: China. - INCLUYE - • Hidrolavadora Black+Decker pw1370td. • Lanza ajustable. ', 11558, 2, "productImage-1627417753739.jpg");

INSERT INTO products_categories VALUES (DEFAULT, 1, 1);
INSERT INTO products_categories VALUES (DEFAULT, 2, 1);
INSERT INTO products_categories VALUES (DEFAULT, 3, 1);
INSERT INTO products_categories VALUES (DEFAULT, 4, 1);
INSERT INTO products_categories VALUES (DEFAULT, 5, 1);
INSERT INTO products_categories VALUES (DEFAULT, 6, 1);
INSERT INTO products_categories VALUES (DEFAULT, 7, 5);