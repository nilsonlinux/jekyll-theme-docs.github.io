---
title:  Personalização
---


<section id="archive">
  <h3>>> Notícias deste ano</h3>
  {%for post in site.posts %}
    {% unless post.next %}
      <ul class="this">
        {% else %}
        {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
        {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
        {% if year != nyear %}
      </ul>
      <h3>>> {{ post.date | date: '%Y' }}</h3>
      <ul class="past">
      {% endif %}
    {% endunless %}
    <li><time>{{ post.date | date:"%d-%m" }}</time> <a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
  </ul>
</section>