# Entwicklungsprotokoll

## 2026-09-23 — v0.2.0 — Filter und Suchlisten
- v0.1.1 wurde vom Nutzer praktisch bestätigt: Suche, Preview und Vorhören funktionieren gut. Dieser Stand ist Referenz.
- Preview/Vorhörmechanismus wurde funktional nicht umgebaut.
- Suche kann jetzt ohne Titel allein über Filter erfolgen.
- Zusätzliche Filter: Typ/Rhythmus, Tonart und Taktart; kombinierbar mit Titelsuche.
- Trefferlimit für den Test auf 100 erhöht.
- Benannte Suchlisten: Treffer mit ABC, Metadaten und Quelle werden vollständig gespeichert.
- Suchlisten liegen lokal im Browser (localStorage).
- Listen können als JSON-Datei gespeichert und wieder geladen werden.
- Einzelne Einträge können aus Listen entfernt werden.
- Noch keine zweite Suchquelle; diese folgt erst nach Praxistest von v0.2.

## 2026-09-23 — v0.1.1 — bestätigter erster Suchstand
- ABC Tools gezielt untersucht. Tune-Suche basiert u. a. auf `abctunes_thesession_28may2026.json`.
- The-Session-Bestand wird geladen und lokal durchsucht.
- Provider liefert strukturierte Treffer mit ABC und Metadaten.
- Trefferliste mit Preview, Vorhören und Stop.
- Vom Nutzer auf dem iPad praktisch getestet und als gut funktionierend bestätigt.

## 2026-09-23 — Start V0.1
- Eigenständiges Repository und provider-neutraler Kern.
- Ziel: Suche → Trefferliste → Auswahl → Vorhören.
- Keine Integration in andere Apps vor bestandenem Praxistest.

## Verbindliche Entwicklungsregeln
- Vor neuer Technik zuerst vorhandene eigene stabile Lösungen prüfen.
- Programmcode, externe Quelle/API, Deployment und Browser/PWA-Cache getrennt diagnostizieren.
- Keine vermutete Fehlerursache als Tatsache behandeln.
- Kleine eigenständig testbare Schritte; erst nach bestandenem Praxistest erweitern.
- Funktionierenden Code bei angrenzenden Änderungen nicht unnötig umbauen.

## 2026-09-25 — v0.6.2 — Stabilisierung
- Statische Quellenanzeige auf drei tatsächlich aktive Provider korrigiert.
- Test-App und Service Worker versionsgebunden; Cache auf v0.6.2.
- README auf den tatsächlich erreichten Funktionsstand aktualisiert.
