# Report 8 (2.5. - 8.5.)

**Meno a priezvisko:** Norbert Jurík

**Názov projektu:** Kartotéka

## Práca tento týždeň

1. Notifikácie (_2h_) [c2062fd](https://github.com/NorbertJu/kartoteka/commit/c2062fdbb6e1ef597c7c5f1be7c9e07344b08da9)
   - Pridaný scheduler, ktorý raz denne prekontroluje a následne odošle email upozornenia manažérovi a používateľom, ktorí nesplnili termín deadlinu pre daný deň

2. Nasadenie, otestovanie aplikácie a fixnutie chýb (2h) [bf4ae07](https://github.com/NorbertJu/kartoteka/commit/bf4ae07c4f7631a6d16e36db601ccbaa4e9df58b) [65d0160](https://github.com/NorbertJu/kartoteka/commit/65d0160e639f2a6783cc021e7de87329f625ce04)
   - Otestovanie funkcionality na verejnej inštancii a opravenie menších chýb

## Plán na ďalší týždeň

- Prezentácia finálnej verzie projektu

## Prehľad práce

- Implementácia _62h_
  - Administrácia používateľa
  - Vyhľadávania a filtrovanie dokumentov
  - Prezeranie dokumentov
  - Vytváranie a úprava dokumetov pomocou editora
  - Označenie pokroku pre dokument
  - Prehľad pokroku pre rozčítané dokumenty
  - Pridávanie poznámok k dokumentu
  - Vytvorenie študijnej skupiny
  - Pridávanie členov do skupiny
  - Priradenie dokumentu skupine
  - Prehľad pokroku priradených dokumentov
  - Notifikácie

- Odhadovaný čas práce _58h_

- Problémy
  - Tvorba zložitejších selectov z databázy cez mongoose
  - Časová náročnosť celého projektu

- Čo by som spravil inak?
  - Lepšie rozdeliť komponenty frontendu
  - Vyhradiť si čas na refactoring
  - Vymyslieť lepší dizajn

- Zhodnotenie

  Výsledný stav projektu hodnotím ako vydarený. Finálna verzia projektu je funkčná a spĺňa všetky požiadavky špecifikácie. Medzeri projektu vidím vo vizuálnej stránke a nedostatku refaktorizácie kódu.

- Počet riadkov kódu

  ![image](https://user-images.githubusercontent.com/47781282/167305687-75732c92-2f6b-44b4-a2c9-7281ab1826c4.png)

## Verejná inštancia projektu

https://kartoteka-frontend.github.io/
