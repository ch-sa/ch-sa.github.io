---
layout: post
title: "PyQt & PyPI – Navigating the Python Packaging Jungle"
date: 2022-01-22 20:35:00
tags: PyQt Python Packaging labelCloud
---

![Jungle]({{site.baseurl}}/assets/img/2022-01-22_Djungle.jpg)
*Picture by [Bruno
Abdiel](https://www.pexels.com/de-de/@phototrackbr?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)
via
[Pexels](https://www.pexels.com/de-de/foto/leere-braune-holzfussbrucke-236412/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)*


Recently I was struggling to package my PyQt software
[labelCloud](https://github.com/ch-sa/labelCloud) for `pip`. It turns out that just
because something works for you locally doesn't mean it will still work after you
package it. And some PyQt specifics add some extra rocks to the track. So I began my
journey into the joys of Python packaging. This post might not be a best practice, but
it intends to spare you some detours and quickly get to a working setup.


## Adjusting the Package Structure

First things first: the package structure! Not all module architectures are well suited
for packaging. Yet when looking at some of the rather popular Python packages like
[`numpy`](https://github.com/numpy/numpy),
[`pandas`](https://github.com/pandas-dev/pandas) or
[`requests`](https://github.com/psf/requests) we can see that there is a consensus about
the top-level structure. All projects have a folder with the same name as the future
package and repository. So go ahead and add an `__init__.py` and a `__main__.py` file in
that folder. For labelCloud, it ended up looking like that:

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

This is the new package skeleton. Before, the root folder of the repository might have
been the entry point to your package. Now the package lives encapsulated inside the new
folder. Everything within, is considered for packaging while everything outside is not
directly relevant.

Contrary to the example above Python modules and also PyPI packages should usually be
named all *lowercase* (see [PEP 8](https://www.python.org/dev/peps/pep-0008/#package-and-module-names) and [PEP
423](https://www.python.org/dev/peps/pep-0423/#follow-pep-8-for-syntax-of-package-and-module-names)).
{: class="info"}

Once you start releasing your package, this should be [reasonably
versioned](https://www.python.org/dev/peps/pep-0440/#version-scheme), usually in the
`major.minor.patch` scheme. The version is specified in the top-level
[`__init__.py`](https://github.com/ch-sa/labelCloud/blob/master/labelCloud/__init__.py)
file:

{% highlight python %}
# labelCloud/__init__.py
__version__ = "0.7.3"
{% endhighlight %}

Now people can retrieve the version of your package by calling `labelCloud.__version__`.

The `__main__.py` file is now used as an *entry point* to your package. It will be
called whenever somebody runs your package using `python -m labelCloud`. Consequently,
it should contain all the logic to correctly startup your software. However, it should
not be massive and mostly delegate to logic within your package. It can also handle
arguments that were passed with the following script:

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

Note that the imports inside the `__main__.py` are still absolute. However, within the
rest of the package, you should reference your own modules using a relative syntax like
`from .view.gui import GUI`.

## Configuring the Package

Now that the package structure is set up, it's time for configurations. We will add
three new files in the repository root beside the new `labelCloud` folder.

Let's start with the `pyproject.toml`, which tells pip what tools to use for building your
package. While you can read and [try](https://www.python.org/dev/peps/pep-0518/)
[to](https://setuptools.pypa.io/en/latest/build_meta.html)
[understand](https://www.python.org/dev/peps/pep-0621/) the background, you can also
just paste the following and will be fine for now (as of 2022):

{% highlight python %}
# pyproject.toml
[build-system]
requires = [
    "setuptools>=42",
    "wheel"
]
build-backend = "setuptools.build_meta"
{% endhighlight %}

This explains that we want to use
[`setuptools`](https://packaging.python.org/en/latest/key_projects/#setuptools) (version
42 or above) to build our project – the "primary choice for Python packaging" and
require the [`wheel`
extension](https://packaging.python.org/en/latest/specifications/binary-distribution-format/)
to generate an installable `*.whl` file at the end.

Now comes the legendary `setup.py` into play. Looking at the [465 lines inside
numpy](https://github.com/numpy/numpy/blob/main/setup.py) or the [653 lines inside
pandas](https://github.com/pandas-dev/pandas/blob/main/setup.py) you might be tempted to
turn around and tell everyone to continue using `git clone`. 😀 But fear not,
getting a simple package running usually requires a fraction of that effort! Yet maybe
lets breathe some wisdom first:

> The only thing that we know is that we know nothing – and that is the highest flight
> of human wisdom. – *War & Peace, Leo Tolstoy (1869)*

Actually, we just need two lines here:

{% highlight python %}
# setup.py
from setuptools import setup

setup()
{% endhighlight %}

That simple?? Well, we still lack the third file. For now, we just postponed the pain to
deal with in another file: the `setup.cfg`.

In the end, this file will hold all parameters to package and build your project. It is
structured in multiple *sections*, of which we will be using the following:

1. `[metadata]`
2. `[options]`
   * `[options.entry_points]`
   * `[options.extras_require]`
   * `[options.package_data]`

The **metadata** is the simplest section. Just enter the package `name` as in the
repository and folder, provide `maintainer` and `license` details and add a short
`description`. Then add `keywords` separated by a paragraph and classifiers
according to [this list](https://pypi.org/classifiers/). Also, don't forget to link your
repository or website using the `url` parameter.

PyPI also offers you the possibility to visualize a more extended description on each
project page, as you can see for the [labelCloud
page](https://pypi.org/project/labelCloud/). To get the same, add the path of your
README after `file:` to the `long_description` parameter. PyPI accepts plain text,
[reStructuredText](https://docutils.sourceforge.io/rst.html) and [GitHub Flavored
Markdown](https://github.github.com/gfm/), which must be specified inside
`long_description_content_type`.


Note that PyPI cannot resolve relative links inside the README file. Therefore, you
should make all links (also images etc.) absolute, resulting in paths starting with
something like `https://raw.githubusercontent.com/ch-sa/labelCl...png`.
{: class="info"}

You know why it's worth adding another `*.cfg`? The `setup.cfg` can automatically derive
the package version from your `labelCloud/__init__.py` file, when using `version = attr:
labelCloud.__version__`. This way you have one place less to forget bumping the version.
You know it must have been a problem when there is a [whole site in the Python docs
dedicated to getting a single
string](https://packaging.python.org/en/latest/guides/single-sourcing-package-version/).
😉

Okay, now that we have the metadata sorted out, let's start with the real stuff:
**options**. There are a whole bunch of options we have to set correctly so that the
package is later built correctly and all relevant files are considered. If you have
problems understanding a keyword, look at the [official setuptools
reference](https://setuptools.pypa.io/en/latest/references/keywords.html).

First of all, we need to specify all packages that should be included. A package is
every folder that contains an `__init__.py` file. You do that by simply adding a
point-separated path for every such folder to the `packages` parameter starting with the
folder you created in the [first section](#adjusting-the-package-structure).
Alternatively, you can also use `setuptools` automatic package discovery by using:

{% highlight conf %}
# setup.cfg
packages = find:
package_dir =
    =labelCloud
[...]
{% endhighlight %}

I prefer to set them manually to have a bit more control about what's included.

The `zip_safe` parameter can be omitted or set to `False` to be on the safe side. It
[allows the package to be installed as
zip](https://setuptools.pypa.io/en/latest/userguide/miscellaneous.html#setting-the-zip-safe-flag)
thus speeding up the load time. You can test yourself if the software still runs by
setting it to `True` (If you don't use `__file__` it likely is!).

The `python_requires` parameter signifies with which Python versions your software is
compatible. You should try to set it as flexible as possible using [version
specifiers](https://www.python.org/dev/peps/pep-0440/#version-specifiers):

{% highlight conf %}
# setup.cfg
python_requires = >=3.6
[...]
{% endhighlight %}

Suppose your package depends also on other Python packages. Then you must specify those
dependencies inside `install_requires`. Optionally also restrict the supported versions:

{% highlight conf%}
# setup.cfg
install_requires =
    numpy
    open3d
    PyOpenGL
    PyQt5 <= 5.14.1;platform_system=='Windows'
    PyQt5;platform_system!='Windows'
{% endhighlight %}

As you can see in the last two lines it is also possible to [specify dependencies based
on the user's
platform](https://setuptools.pypa.io/en/latest/userguide/dependency_management.html#platform-specific-dependencies).
In this case, a windows user will pull version 5.14.1 or smaller of PyQt, while all
other platform users can use the most recent version. You can find an overview of all
markers and operators in [PEP 508](https://www.python.org/dev/peps/pep-0508/#id14).


Take care that you don't include dependencies into the `install_requires` that are only
necessary for testing your software. These are usually put into the
`options.extras_require` section and [given the `tests`
identifier](https://setuptools.pypa.io/en/latest/userguide/dependency_management.html#optional-dependencies):

{% highlight conf%}
# setup.cfg
[options.extras_require]
tests = pytest; pytest-qt
{% endhighlight %}

Users can now also install the test dependencies by providing the identifier to pip in
square brackets:

{% highlight shell %}
pip install labelCloud[tests]  # will also install pytest and pytest-qt
{% endhighlight %}

Note, however, that if other people participate in the development, it makes sense to
"freeze" all dependencies and provide them in a separate `requirements.txt`. 

Remember the `__main__.py` that we [created at the
beginning](#adjusting-the-package-structure)? We already mentioned it would be the entry
point into the package. We now must specify that here as well:

{% highlight conf%}
# setup.cfg
[options.entry_points]
console_scripts =
    labelCloud = labelCloud.__main__:main
{% endhighlight %}

Actually, a package can have multiple entry points, yet I decided here just for a single
one and therefore named it the same as the package: `labelCloud`. It will be available
globally within your Python environment, meaning that users can start your software
from everywhere with a simple shell command!

On the other hand, this also implies you cannot trust relative file paths anymore that
you use in your software, which brings us to the next section.


## Managing Package Resources

This section only covers the use of `pkg_resources` for retrieving files. Another valid
alternative could be PyQt's native [Qt Resource
System](https://doc.qt.io/qtforpython/overviews/resources.html).
{: class="info"}

Now that users can start your software from literally everywhere we cannot rely on a
fixed folder structure like before. Hence, we must find a better way of accessing
files than relative paths.

For the moment `setuptools` will simply ignore your data files. To make them visible we
need to do something weird and pretend that the data folders are also packages by adding
`__init__.py` to each folder. I created a single
[`labelCloud/resources`](https://github.com/ch-sa/labelCloud/tree/master/labelCloud/resources)
folder, which is collecting all data files.

We tell `setuptools` to retrieve these files by adding the folder locations in the
Python dot-syntax to the `options.package_data` section and specify which file types to
consider (alternatively `*` for all):

{% highlight conf%}
# setup.cfg
[options.package_data]
labelCloud.resources = *.ini, *.pcd, *.txt
labelCloud.resources.examples = *.json, *.ply
labelCloud.resources.icons = *.ico, *.png, *.svg, *.txt
labelCloud.resources.interfaces = *.ui
{% endhighlight %}

All these files will now be packaged and uploaded to PyPI. The only problem is that they
will be extracted into different places than your current project structure upon
installation. Thus, we need a [way to get the path of files during
runtime](https://setuptools.pypa.io/en/latest/userguide/datafiles.html#accessing-data-files-at-runtime).
This is where `pkg_resources` comes into play.

Via the `resource_filename()` function, you get the path to a desired file by providing
its name and import path in dot-syntax. In the following example, I retrieve the PyQt UI
file, which was previously located at `labelCloud/resources/interfaces/interface.ui`:

{% highlight python%}
import pkg_resources

class GUI(QtWidgets.QMainWindow):
    def __init__(self, control: "Controller") -> None:
        super(GUI, self).__init__()
        uic.loadUi(
            pkg_resources.resource_filename(
                "labelCloud.resources.interfaces", "interface.ui"
            ),
            self,
        )
        [...]
{% endhighlight %}

You can find more `pkg_resources` functions in the [interface
specification](https://setuptools.pypa.io/en/latest/pkg_resources.html#resourcemanager-api).


If you changed all your paths in the code like this, the software should also be able to
access all data files after packaging.

## Building the Package

Congratulations, you already passed the most cumbersome section and are slowly entering
the final stretch – [building your
package](https://packaging.python.org/en/latest/tutorials/packaging-projects/#generating-distribution-archives).

First, you need to have a modern version of PyPA's `build` installed:
{% highlight shell%}
python3 -m pip install --upgrade build
{% endhighlight %}

Then change to the root of your repository on the same level as the folder we created in
the first section and run:

{% highlight shell%}
python3 -m build
{% endhighlight %}

This will build your package in an isolated environment. If you are lucky you will see a
green printout at the end like:

{% highlight shell %}
...
Successfully built labelCloud-0.7.3.tar.gz and labelCloud-0.7.3-py3-none-any.whl
{% endhighlight %}

Then the build was successful, and you now have two files inside the newly created `dist`
directory:

1. `labelCloud-0.7.3-py3-none-any.whl` and
2. `labelCloud-0.7.3.tar.gz`


## Publishing to PyPI

The upload to PyPI is even simpler. However, you should really consider testing your
package on TestPyPI first before you go on and upload it to the official PyPI. From my
experience, there will always be something wrong with the initial packaging attempt ...
and a lot of times also the second and third. 😉

So go and register for [TestPyPI](https://test.pypi.org/account/register/) and
afterward [PyPI](https://pypi.org/account/register/). In the settings, you need to
generate a token and keep it open.

Now you must install twine and try your first upload:

{% highlight shell%}
python3 -m pip install --upgrade twine
python3 -m twine upload --repository testpypi dist/*
{% endhighlight %}

Once your test upload and
[installation](https://packaging.python.org/en/latest/tutorials/packaging-projects/#installing-your-newly-uploaded-package)
work flawlessly you can simply drop the `--repository testpypi` to upload to PyPI.

If everything operates well, you should now be able to see your Python package on its own
[PyPI project page](https://pypi.org/project/labelCloud/). 🎉

And if you did not get lost on the way, you made it through the Python
Packaging Jungle ...

![Jungle Escape]({{site.baseurl}}/assets/img/2022-01-30_DjungleEscape.jpg)
*Picture by [Quang Nguyen Vinh](https://www.pexels.com/de-de/@quang-nguyen-vinh-222549?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)
via
[Pexels](https://www.pexels.com/de-de/foto/2-leute-auf-dem-boot-2166711/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)*

... only to enter the rapids of releasing and package maintenance. 😉
