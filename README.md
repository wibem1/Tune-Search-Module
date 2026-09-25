# Tune Search Module

## Stabiler Stand: v0.6.2

Eigenständiges Such- und Vorhörmodul für musikalische Quellen.

Aktiv angeschlossen sind **The Session**, **Gavin Heneghan** und **MuseTrainer**. ABC-Quellen werden über abcjs dargestellt/vorgehört; MusicXML/MXL wird über Verovio geladen und für die Vorschau in MIDI umgesetzt. Suchlisten und der letzte Suchzustand bleiben lokal im Browser erhalten.

## Stabilitätsregeln

- Nur tatsächlich angeschlossene Quellen sind auswählbar; vorbereitete Quellen bleiben deaktiviert.
- Versionsanzeige, Service-Worker-Cache und registrierte PWA-Ressourcen werden gemeinsam versioniert.
- Programmcode, externe Quelle/API, Deployment und Browser/PWA-Cache werden getrennt diagnostiziert.
- Neue Quellen werden einzeln integriert und getestet; sie dürfen funktionierende Provider nicht verändern.

## Stand v0.6.2

Die statische Quellenanzeige wurde mit den drei tatsächlich aktivierten Quellen synchronisiert und die PWA-Ressourcen wurden versionsgebunden, damit ein alter Home-Screen-Cache nicht stillschweigend weiterläuft.
