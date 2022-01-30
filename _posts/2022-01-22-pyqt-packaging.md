---
layout: post
title: "PyQt & PyPI – Navigating the Python Packaging Djungle"
date: 2022-01-22 20:35:00
tags: PyQt Python Packaging labelCloud
---

Warning, this is still work in progress!
{: class="warning"}


![Djungle]({{site.baseurl}}/assets/img/2022-01-22_Djungle.jpg)
*Picture taken from [Bruno Abdiel](https://www.pexels.com/de-de/@phototrackbr?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels) via [Pexels](https://www.pexels.com/de-de/foto/leere-braune-holzfussbrucke-236412/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)*


Recently I was struggling to package my PyQt software
[labelCloud](https://github.com/ch-sa/labelCloud) for `pip`. It turns out that just
because something works for you locally doesn't mean it will still work after you
package it. And some PyQt specifics add some extra stones to the track. So I began my
journey into the joys of Python packaging. This post might not be a best practice but
its intention is to spare you some detours and get to a working setup quickly.


## Adjusting the Package Structure

First things first: the package structure! Not all module architectures are well suited
for packaging. Looking at some of the rather popular Python packages like
[`numpy`](https://github.com/numpy/numpy),
[`pandas`](https://github.com/pandas-dev/pandas) or
[`requests`](https://github.com/psf/requests) we see that there is a consensus at least
about the top level structure. All projects have folder with the same name as the future
package and repository. So go ahead and do the same and also add an `__init__.py` and a
`__main__.py` file in that folder. For labelCloud this ended up looking like that:

{% highlight shell %}
labelCloud
├── docs
│   ├── documentation.md
├── labelCloud
│   ├── __init__.py
│   ├── __main__.py
│   └── ...  # add your modules here
├── LICENSE
├── README.md
└── requirements.txt
{% endhighlight %}

This is the new package skeleton. While maybe before the root of the repository was the
entry point to your software this should now live inside the new folder. Everything
within is considered for packaging while everything outside is not directly relevant.

Note that contrary to the example Python modules and also PyPI packages should be named
all lowercase (see [PEP
8](https://www.python.org/dev/peps/pep-0008/#package-and-module-names) and [PEP
423](https://www.python.org/dev/peps/pep-0423/#follow-pep-8-for-syntax-of-package-and-module-names)).
{: class="info"}

Once you start releasing your package, this should be [reasonably
versionized](https://www.python.org/dev/peps/pep-0440/#version-scheme), usually in the
`major.minor.patch` scheme. This version is specified in the top level
[`__init__.py`](https://github.com/ch-sa/labelCloud/blob/master/labelCloud/__init__.py)
file:

{% highlight python %}
# labelCloud/__init__.py
__version__ = "0.7.3"
{% endhighlight %}

Now people can retrieve the version of your package by calling `labelCloud.__version__`.

The `__main__.py` file is now used as *entrypoint* to your package. It will be called
whenever somebody runs your package using `python -m labelCloud`. Consequently it should
contain all the logic to correctly startup your software. However it should not be
massive and mostly delegate to logic within your package. It can also handle arguments
that were passed with the call:

{% highlight python %}
# labelCloud/main.py
import argparse
import logging
import sys

from PyQt5.QtWidgets import QApplication, QDesktopWidget

from labelCloud import __version__
from labelCloud.control.controller import Controller
from labelCloud.view.gui import GUI


def main():
    parser = argparse.ArgumentParser(
        description="Label 3D bounding boxes inside point clouds."
    )
    parser.add_argument(
        "-v", "--version", action="version", version="%(prog)s " + __version__
    )
    args = parser.parse_args()

    app = QApplication(sys.argv)
    view = GUI(control)
    [...]
    view.show()  # Start GUI
    sys.exit(app.exec_())


if __name__ == "__main__":
    main()
{% endhighlight %}

Note that the imports inside the `__main__.py` are still absolute. Within the rest of
the package however you should try to reference to your own in relative syntax like
`from .view.gui import GUI`.

## Configuring the Package

Now that the package structure is set up, it's time for configurations. To do this we
will add three new files in the repository root beside the new `labelCloud` folder.

We start with the `pyproject.toml`, which tells pip what tools to use for building your
package. While you can read and [try](https://www.python.org/dev/peps/pep-0518/)
[to](https://snarky.ca/what-the-heck-is-pyproject-toml/)
[understand](https://www.python.org/dev/peps/pep-0621/) the background, you can also
just paste the following and will be fine (as of 2022) for now:

{% highlight python %}
[build-system]
requires = [
    "setuptools>=42",
    "wheel"
]
build-backend = "setuptools.build_meta"
{% endhighlight %}


Now comes the magic of the legendary `setup.py` into play. Looking at the [465 lines
inside numpy](https://github.com/numpy/numpy/blob/main/setup.py) or the [653 lines
inside pandas](https://github.com/pandas-dev/pandas/blob/main/setup.py) you might be
tempted to turn around and tell everyone to continue using `git clone`. 😀 ... but fear
not, getting a simple package running usually requires a fraction of that effort!

Actually we just need two lines here:

{% highlight python %}
from setuptools import setup

setup()
{% endhighlight %}

That simple?? ... well we still lack the third file. For now we basically just postponed
the pain into another file: the `setup.cfg`.

In the end this file will hold all parameters to package and build your project. It is
structured in multiple *sections*, of which we will be using the following:

1. `[metadata]`
2. `[options]`
   * `[options.entry_points]`
   * `[options.extras_require]`
   * `[options.package_data]`

The **metadata** is the simplest section. Just enter the package `name` as in the
repository and folder, provide `maintainer` and `license` details and add a short
`description`. Then add `keywords` separated by a paragraph and add classifiers
according to [this list](https://pypi.org/classifiers/). Also don't forget to link your
repository or website using the `url` parameter.

Now PyPI also offers the possibility to visualize a longer description on each project
page, as you can see for the [labelCloud page](https://pypi.org/project/labelCloud/). To
get the same, add the path of your README after `file:` to the `long_description`
parameter. PyPI accepts plain text,
[reStructuredText](https://docutils.sourceforge.io/rst.html) and [GitHub Flavored
Markdown](https://github.github.com/gfm/), which has to be specified inside
`long_description_content_type`.


Note that PyPI cannot resolve relative links inside the README file. This means you
should make all links (also images etc.) absolute, resulting in paths starting with
something like `https://raw.githubusercontent.com/ch-sa/labelCl...png`.
{: class="info"}

One of the nicer conveniences of the `setup.cfg` way is that you can automatically
derive the package version from your `labelCloud/__init__.py` file using `version =
attr: labelCloud.__version__`. Thus you have one place less where you could forget about
that. ... you know it was a problem, when there is a [whole site in the Python docs
dedicated to getting a single
string](https://packaging.python.org/en/latest/guides/single-sourcing-package-version/).
😉

To be continued from here ...
{: class="warning"}

## Easing the Release Process

To be started!
{: class="warning"}