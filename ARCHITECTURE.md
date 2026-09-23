# Tune Search Module – Architektur

## Zweck
App-unabhängiges gemeinsames Such- und Vorhörmodul für online verfügbare ABC-Musikbestände. Es soll Minimal Composer, MusicChat und später weitere Anwendungen bedienen.

## Grundprinzip
Tune Search sucht, filtert, zeigt Metadaten, ermöglicht Vorhören und liefert einen ausgewählten Tune samt Quelle an die aufrufende Anwendung bzw. an das Notation Module. Es kennt keine Runs, Chats oder app-spezifische Speicherlogik.

## V0.1 – Zielumfang
1. Suche in geeigneten ABC-Quellen.
2. Übersichtlichere Ergebnisdarstellung als in ABC Tools.
3. Metadaten soweit vorhanden: Titel, Quelle/Urheber, Tonart, Taktart, Rhythmus/Gattung, Besetzung.
4. Filter nach verfügbaren musikalischen Metadaten.
5. **Vorhören direkt in der Trefferliste.**
6. Ausgewählten Treffer im Notation Module öffnen.
7. ABC-Text und Quelleninformation an die aufrufende App übergeben.
8. Herkunft/Quellenangabe erhalten.

## Spätere Möglichkeiten
- Suche anhand von ABC-Melodiefragmenten.
- Transpositionsunabhängige Melodie-/Kontursuche.
- Musikalische Ähnlichkeitssuche.
- Weitere katalogisierte ABC-Quellen.

Diese Funktionen gehören nicht zwingend in V0.1.

## Schnittstellenidee
```js
TuneSearch.search(query, filters)
TuneSearch.preview(resultId)
TuneSearch.stopPreview()
TuneSearch.getTune(resultId)
// -> { abc, metadata, source }
```

Das Notation Module kann das zurückgegebene ABC anschließend darstellen und bearbeiten. Tune Search selbst muss deshalb keinen eigenen vollständigen Noteneditor enthalten.

## Verhältnis zu ABC Tools
Die Tune-Suche von ABC Tools ist Referenz und Untersuchungsgegenstand, aber nicht die Architekturvorlage. Insbesondere soll die Bedienung neu und übersichtlicher entworfen werden.

## Quellen
Das Modul soll externe Bestände nicht wahllos spiegeln. Quelle, Herkunft und vorhandene Rechte-/Lizenzinformationen werden respektiert und mitgeführt.

## Entwicklungsregeln
- Eigenständiges Modul und eigene Versionsnummer.
- Keine Abhängigkeit von Minimal Composer oder MusicChat.
- Vorhören als Kernfunktion, nicht als Zusatz.
- Suchanbieter hinter einer austauschbaren Provider-Schnittstelle kapseln.
- Kleine testbare Schritte.
- Integration in Apps erst nach eigenständigem Funktionstest.
