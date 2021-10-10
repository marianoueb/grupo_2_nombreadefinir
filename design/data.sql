INSERT INTO user_types VALUES (1, 'User');
INSERT INTO user_types VALUES (2, 'Admin');
INSERT INTO user_types VALUES (3, 'Owner');

INSERT INTO users VALUES (DEFAULT, "Usuario", "Uno", "user@toolbox.com", "$2b$10$NnjxEGYqkB19N9AQ938NxemeJk08ZAUn0Jc5ljvxNReYhuHH/u35S", 1122334455, "default.png", 1);
INSERT INTO users VALUES (DEFAULT, "Administrador", "Uno", "admin@toolbox.com", "$2b$10$yZZ3Ldvs1QtzVZeur8xAte1e59bjab33rTpA97645H16R8IBET/AS", 1152334455, "default.png", 2);
INSERT INTO users VALUES (DEFAULT, "Creador", "Uno", "owner@toolbox.com", "$2b$10$C2qqPh3WWahjWTCuZPPxq.p/msuVkEnDZL7fRVcIeTS.4.rHZ5VJa", 1182334455, "default.png", 3);

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
INSERT INTO brands VALUES (DEFAULT, 'KLD', 'logo-1631663123811.jpg');
INSERT INTO brands VALUES (DEFAULT, 'Bambin', 'logo-1631663586052.jpg');
INSERT INTO brands VALUES (DEFAULT, 'Casablanca', 'logo-1631667256917.jpg');
INSERT INTO brands VALUES (DEFAULT, 'Alba', 'logo-1631667327896.jpg');
INSERT INTO brands VALUES (DEFAULT, 'FV', 'logo-1631668717255.jpg');
INSERT INTO brands VALUES (DEFAULT, 'Acqua System', 'logo-1631668762083.jpg');
INSERT INTO brands VALUES (DEFAULT, 'Biasonni', 'logo-1631688490544.jpg');

INSERT INTO products VALUES (DEFAULT, 'Alicate Bremen', 'Alicate C.oblicuo Bremen 7"', 954.27, 3, 1, "alicate-7-bremen.jpg");
INSERT INTO products VALUES (DEFAULT, 'Balde', 'Balde plástico de albañil reforzado', 181.66, 1, 1, "balde-plastico.jpg");
INSERT INTO products VALUES (DEFAULT, 'Caja de herramientas', 'Caja plastica 500x260x250 20.5″ t/metal.-2040', 3696.87, 4, 1, "caja-plastica.jpg");
INSERT INTO products VALUES (DEFAULT, 'Calibre metálico', 'Calibre metálico importado cromado mate c/freno', 1462.74, 1, 1, "calibre-metalico.jpg");
INSERT INTO products VALUES (DEFAULT, "Candado 32mm", "Candado bronceado Dubai 32mm", 309.30, 5, 1, "candado-dubai-32mm.jpg");
INSERT INTO products VALUES (DEFAULT, 'Cinta métrica', 'Cinta métrica auto-frenante 3mx19mm Bremen', 1152.11, 3, 1, "cinta-metrica-3m-bremen.jpg");
INSERT INTO products VALUES (DEFAULT, 'Hidrolavadora Black & Decker PW1370', 'HIDROLAVADORA ELÉCTRICA 1300 W • Marca: Black+Decker. • Modelo: Pw1370td. ESPECIFICACIONES - • Potencia: 1300w. • Caudal máximo: 6,5 L/min. • Caudal de trabajo: 5 L/min. • Presión máxima: 110 bar (1595 Psi) • Manguera: 3 m. • Cable: 5 m. • Apagado automático. • Almacenaje para accesorios. • Filtro de entrada de agua para más vida útil. • Origen: China. - INCLUYE - • Hidrolavadora Black+Decker pw1370td. • Lanza ajustable. ', 11558, 2, 5, "productImage-1627417753739.jpg");
INSERT INTO products VALUES (DEFAULT, 'Set de herramientas  KLD1841', 'SET HERRAMIENTAS KLD1841 132 PIEZAS KLD
- Set de herramientas 132 piezas con caja plegable
- 3 DEST. SL6*100,PH1*100,PH2*100
- 1 DESTORNILLADOR PORTAS PTAS
- 1 ALICATE PUNTA LARGA 6"
- 1 PINZA PICO DE LORO 9"
- 1 LLAVE AJUSTABLE 6"
- 1 MARTILLO GALPONERO C/ACERO
- 89 CLAVOS
- 20 PUNTAS 6MM PH0-PH1-PH2-PH3-T10-T15-T20-T25-T30-T40-SL3-SL4-SL5 SL6-SL7-H3-H4-H5-H6-AD
- 1 TIJERA DE 8.5"
- 8 LLAVE ALLEN 1.5-2.5-3-4-5-5.5-6MM
- 6 DEST. DE PRECISION 2.0,2.4,3.0,PH00,PH0,PH1
- Modelo KLD1841
- Garantía fabricante 6 meses', 3854, 6, 1, 'productImage-1631663344183.jpg');
INSERT INTO products VALUES (DEFAULT, 'Rodillo Roller con Jaula 22cm ', 'Material Rodillo: Lana sintética 7 mm.
Roller sin costura.
Apto para todo tipo de pinturas.
Diámetro de caño: 40mm.
Diámetro de alambre: 6` ', 324, 7, 2, 'productImage-1631664627543.jpg');
INSERT INTO products VALUES (DEFAULT, 'Pincel Bambin n°10', 'PINCEL BAMBIN AFICIONADO Nº 10

- Virola 1
- Cerda Corta
- 100% Cerda China
- Uso Amateur
- Funda plástica protectora', 241, 7, 2, 'productImage-1631667045276.jpg');
INSERT INTO products VALUES (DEFAULT, 'Pincel Bambin n°20', 'PINCEL BAMBIN AFICIONADO Nº 20

- Virola 1
- Cerda Corta
- 100% Cerda China
- Uso Amateur
- Funda plástica protectora', 451, 7, 2, 'productImage-1631667098028.jpg');
INSERT INTO products VALUES (DEFAULT, 'Rodillo Roller con Jaula 17cm ', 'Rodillo Roller con Jaula 7mm sin Costura

Material Rodillo: Lana sintética 7 mm.
Roller sin costura.
Apto para todo tipo de pinturas.
Diámetro de caño: 40mm.
Diámetro de alambre: 6`', 229, 7, 2, 'productImage-1631667145948.jpg');
INSERT INTO products VALUES (DEFAULT, 'Pintura Latex para frentes 4lt', 'PINTURA LATEX PERFORMANCE FRENTES MATE HIDRO-REPELENTE
CANTIDAD : 4 Lt
MARCA: CASABLANCA

USOS: Producto apropiado para paredes de concreto, revoque, ladrillos, maderas y mampostería en general.

DESCRIPCIÓN:
Recubrimiento hidro-repelente de alto poder cubritivo, ideal para proteger y renovar paredes y revestimientos exteriores, evitando el deterioro prematuro causado por la acción de los hongos y agentes atmosféricos. Su película de gran repelencia al agua le permite disminuir notablemente el ensuciamiento provocado por el agua de lluvia y el hollín. Su acabado mate garantiza un trabajo de excelente terminación con mínimo salpicado. Se podrá lograr una amplia gama de colores con la mezcla de colores preparados o agregando un máximo de 30 cm3 de entonador universal por litro de producto, o a través del sistema tintométrico.

PIGMENTO: Dióxido de titanio.

PESO ESPECÍFICO: 1,29 +/-0.02 gr/cm3.

VEHÍCULO: Polímero acrílico en dispersión acuosa.

RENDIMIENTO: 12 a 14 m2 por litro por mano.

BRILLO: Mate

SECADO AL TACTO: 30 minutos.

REPINTADO MÍNIMO: 4 horas

TIEMPO DE ALMACENAMIENTO: Limpiar perfectamente la superficie de modo de eliminar suciedad, grasitud, restos de adhesivos, hongos y algas, polvillo y partes flojas o descascaradas de materiales preexistentes. No dejar restos de los productos utilizados para la limpieza.

TRATAMIENTO PREVIO: Si se considera necesario diluir, utilizar la mínima cantidad de agua que facilite una co?moda aplicacio?n. Mezclar la pintura con movimientos ascendentes hasta lograr uniformidad de color y viscosidad.

PRECAUCIONES DE SEGURIDAD: Mantener fuera del alcance de los niños. Evitar su ingestión. Evitar contacto con ojos, mucosas y contacto prolongado con la piel. Procurar adecuada ventilación durante la aplicación y secado.', 1374, 8, 2, 'productImage-1631667640713.jpg');
INSERT INTO products VALUES (DEFAULT, 'Pintura Latex de interior Mate', 'PINTURA LATEX INTERIOR MATE ALBALATEX
CANTIDAD: 4 Lt
MARCA: ALBA

*Información principal:
- Acabado Mate
- Cobertura ≈ 12 m²/L
- Tiempo de secado Secado al tacto: 1 hora Secado entre manos: 3 a 4 horas
-CAPAS: 2

*Descripción del producto:
Látex para Interiores Mate. Excelente poder cubritivo, nivelación y gran lavabilidad. Optimo poder antihongo. Colores más puros. Blanco, entonable con Tonalba hasta 60 cm3/litro. Todos los colores Language of Colors.

-Fácil de aplicar
-Excelente Terminación
-Antihongos
-Alto cubritivo
-Lavable


*Se aplica con:
Pincel, rodillo o soplete


*Seguridad:
-ADVERTENCIAS:
Mantener fuera del alcance de niños. Mantener el recipiente bien cerrado, en forma vertical y fuera del alcance de animales. No ingerir. Evitar el contacto con la piel, los ojos y la ropa. No arrojar el envase en incineradores o fuego. No arrojar pintura en drenajes, suelo o cursos de agua. Trabajar en ambientes ventilados (puertas y ventanas abiertas) Para aplicación a soplete usar máscara apropiada. Utilizar protección ocular y mascarilla en el caso de tener que lijar. De ser posible usar lijas al agua húmedas. Operaciones de lijado en seco, corte con llama y/o soldadura de superficies pintadas generan polvos y/o humos peligrosos Cubrir siempre los tomacorrientes a fin de evitar que entre pintura. En el caso de utilizar escalera, apoyar la misma sobre superficies niveladas y usar calzado de goma antideslizante. No quemar pinturas viejas para removerlas de la superficie. No almacenar alimentos en los envases vacíos', 3132, 9, 2, 'productImage-1631667920663.jpg');
INSERT INTO products VALUES (DEFAULT, 'Juego De Herramientas B&D 153p', 'Juego herramienta BMT153C-LA 153 piezas Black+Decker

• 1 cabeza: 1/4'',
• 9 dados encastre: 1/4''(5,13 mm),
• 30 puntas: 1'' (25 mm),
• fenda: 2,5, 4, 5, 5,5, 6,
• PHO, PH1, PH1, PH2, PH2, PH3, T10, T15, T20, T25, T27, T30, H1,5, H2, H2,5, H3, H4, H5, H6, PZ0, PZ1, PZ1, PZ2, PZ2, PZ3,
• Destornilladores: fenda 5 x 75 m, fenda 6 x 100 mm, PH1 x 75 mm, PH2 x 100 mm,
• Llaves hexagonales: de 1,5 - 10 mm,
• Alicate corte diagonal: 6'' (160 mm),
• Alicate universal: 6'' (160 mm),
• Alicate bomba de agua: 250 mm,
• Martillo mango de acero: 12 oz,
• Cuchilla snap-off: 18 mm,
• Repuesto para cuchilla snap-off: 18 mm,
• Regla de metal: 6'' (150 mm),
• Nivel torpedo: 9'' (225 mm. ', 9232, 2, 1, 'productImage-1631668958033.jpg');
INSERT INTO products VALUES (DEFAULT, 'Kit de grifería para baño FV', 'Color     
Cromo

Apto para calefón y/o termotanque

Linea
B2P Newport Plus
Tecnología     

Cierre tradicional o de cuerito
Prestaciones     

Durabilidad, Fácil limpieza, Función anticalcárea ', 29362, 10, 3, 'productImage-1631675397881.jpg');
INSERT INTO products VALUES (DEFAULT, 'Tee normal Acqua System 32mm', 'Tee normal Acqua System 32mm', 50, 11, 3, 'productImage-1631669346585.jpg');
INSERT INTO products VALUES (DEFAULT, 'Caño Acqua System p/Agua fría ', 'TUBO ACQUA SYSTEM PARA AGUA FRÍA Y CALIENTE 4M X TIRA', 9301, 11, 3, 'productImage-1631688245843.jpg');
INSERT INTO products VALUES (DEFAULT, 'Carretilla 100lts', 'Carretilla 100lts', 8238, 1, 4, 'productImage-1631688399770.jpg');
INSERT INTO products VALUES (DEFAULT, 'Pala Cabo Corto Punta Corazon ', 'Pala Cabo Corto Punta Corazon Fabricadas en una sola Pieza y Forjadas en Aceros Especiales. Templadas y Revenidas en Hornos Automáticos. La Diferencia de Espesores en la Hoja de Arriba Hacia Abajo, Hace que las Mismas Sean Auto-afilables. Marca BIASSONI', 4021, 12, 4, 'productImage-1631688539403.jpg');

/*
INSERT INTO categories VALUES (DEFAULT, 'Plomería', 'fas fa-sink');
INSERT INTO categories VALUES (DEFAULT, 'Jardinería', 'fas fa-fan');
INSERT INTO categories VALUES (DEFAULT, 'Maquinaria', 'fas fa-snowplow');
*/

INSERT INTO carts VALUES (DEFAULT, 1, 2021-09-18, 7);
INSERT INTO carts VALUES (DEFAULT, 1, 2021-09-18, 8);
INSERT INTO carts VALUES (DEFAULT, 1, 2021-09-18, 9);