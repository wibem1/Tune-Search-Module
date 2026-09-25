# Tune Search Module

## Stabiler Stand: v0.6.2

Eigenständiges Such- und Vorhörmodul für musikalisches Quellenmaterial.

Aktiv angeschlossen sind **The Session**, **Gavin Heneghan** und **MuseTrainer**. Je nach Quelle werden ABC bzw. MusicXML/MXL verarbeitet; Vorschau und Vorhören erfolgen mit den vorhandenen Browser-Musikkomponenten. Suchlisten können lokal gespeichert, exportiert und wieder importiert werden.

Die in der Oberfläche als „vorbereitet“ gekennzeichneten Quellen sind ausdrücklich noch nicht als aktive Provider angeschlossen.

### Stabilitätsregeln

- Versionsnummer, JavaScript-Asset und Service Worker werden gemeinsam versioniert.
- Der Service Worker verwendet einen versionsgebundenen Cache und löscht alte Caches bei Aktivierung.
- Externe Quelle/API, Programmcode, Deployment und PWA-Cache werden getrennt diagnostiziert.
- Neue Suchprovider werden erst nach eigenständigem Test aktiviert.
