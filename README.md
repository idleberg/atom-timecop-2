# timecop-2

[![apm](https://flat.badgen.net/apm/license/timecop-2)](https://atom.io/packages/timecop-2)
[![apm](https://flat.badgen.net/apm/v/timecop-2)](https://atom.io/packages/timecop-2)
[![apm](https://flat.badgen.net/apm/dl/timecop-2)](https://atom.io/packages/timecop-2)
![AppVeyor: build](http://flat.badgen.net/appveyor/ci/idleberg/atom-timecop-2)
![Travis: build](http://flat.badgen.net/travis/idleberg/atom-timecop-2)
![David: dependencies](http://flat.badgen.net/david/dep/idleberg/atom-timecop-2)

## Description

Displays information about where time is spent while Atom loads.

  * Startup time
  * Compile cache
  * Package loading time
  * Package activation time
  * Theme loading time
  * Theme activation time

This package is a fork of the [timecop](https://github.com/atom/timecop). Here are the main differences:

  * customizable threshold times
  * customizable onClick actions
  * minor UI changes

Inspired by [Timecop 2: The Berlin Decision](https://www.imdb.com/title/tt0318763/) the movie (not really!)

## Installation

### apm

Install `timecop-2` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install timecop-2`

### Using Git

Change to your Atom packages directory:

**Windows**

```cmd
$ cd %USERPROFILE%\.atom\packages
```

**Linux & macOS**

```bash
$ cd ~/.atom/packages/
```

Clone the repository as `timecop-2`:

```bash
$ git clone https://github.com/idleberg/atom-timecop-2 timecop-2
```

Install dependencies:

```bash
cd timecop-2 && npm install
```
