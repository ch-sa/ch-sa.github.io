---
title: Christoph Sager
---

## Posts
<p>
{% for post in site.posts %}   
    <small style="margin-bottom: 0px; padding-bottom: 0px"><strong>{{ post.date | date: "%B %e, %Y" }}</strong>  {{ post.category }}</small>          
    <h3 style="margin-top: 0px; padding-top: 0px"><a href="{{ post.url }}">{{ post.title }}</a></h3>
{% endfor %}
</p>

## About Me

I develop software mostly in `Python` and am interested in Robotics, Computer Vision, Machine Learning and Software Engineering in general.
I studied Information Systems at [TU Dresden](https://tu-dresden.de/). As part of my Diploma thesis I created [labelCloud](https://github.com/ch-sa/labelCloud), a software to annotate 3D bounding boxes in point clouds, which I published under a free license and maintain since.