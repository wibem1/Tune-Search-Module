# Entwicklungsprotokoll

## 2026-09-23 — v0.1.1 — erster echter ABC-Tools-Suchtest
- ABC Tools gezielt untersucht. Der aktuelle Code verwendet für die Tune-Suche zwei lokale/zwischengespeicherte JSON-Bestände; insbesondere `abctunes_thesession_28may2026.json`.
- ABC Tools lädt diesen The-Session-Bestand von `michaeleskin.com/abctools/` und speichert ihn im Browser in IndexedDB. Die Suche selbst läuft anschließend lokal im geladenen JSON.
- Der aktuelle The-Session-Bestand ist ein flaches JSON; ABC-Tools-Code greift u. a. auf `name`, `abc` und `setting_id` zu.
- Für unseren ersten Test wurde genau dieses Prinzip isoliert: Provider lädt den Bestand einmal, sucht lokal nach Titel und liefert strukturierte Treffer.
- Trefferliste zeigt Titel und vorhandene Metadaten; jeder Treffer hat **Vorhören** und **Stop**.
- Vorhören verwendet abcjs direkt im Browser. Keine Kopplung an das Notation Module.
- Noch keine Behauptung, dass der Stand auf iPad/WebApp funktioniert: Praxistest steht aus.

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
