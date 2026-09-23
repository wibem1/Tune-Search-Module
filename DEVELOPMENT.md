# Entwicklungsprotokoll

## 2026-09-23 — Start V0.1
- Vorhandenes Architekturkonzept vor Beginn gelesen.
- Repository bleibt eigenständig: `wibem1/Tune-Search-Module`.
- Erster Testumfang bewusst klein: Suche → Trefferliste → Auswahl → Vorhören.
- Suchquellen werden hinter einer Provider-Schnittstelle gekapselt; keine feste Kopplung der Oberfläche an eine einzelne Website.
- Quellenangabe und vorhandene Metadaten bleiben Bestandteil jedes Treffers.
- ABC Tools ist nur Referenz für Quellen/Funktionen, nicht Architekturvorlage.
- Noch keine Integration in Notation Module, Minimal Composer oder MusicChat.

## Verbindliche Entwicklungsregeln
- Vor neuer Technik zuerst vorhandene eigene stabile Lösungen prüfen.
- Programmcode, externe Quelle/API, Deployment und Browser/PWA-Cache getrennt diagnostizieren.
- Keine vermutete Fehlerursache als Tatsache behandeln.
- Kleine eigenständig testbare Schritte; erst nach bestandenem Praxistest erweitern.
- Testlink erst nach abgeschlossenem letzten GitHub-Pages-Deployment freigeben.
- Funktionierenden Code bei angrenzenden Änderungen nicht unnötig umbauen.
