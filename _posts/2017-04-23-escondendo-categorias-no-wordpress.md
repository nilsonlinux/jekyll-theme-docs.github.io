---
layout: post
title: "Escondendo uma categoria da index do seu site no Wordpress"
---


Vá em http://seusite.com/wp-admin/edit-tags.php?taxonomy=category  
E procure a tag_ID esse número é o ID da categoria.  

Com esse número em mãos, vá até:  
http://seusite.com/wp-admin/ > Aparência > Editor e procure o arquivo functions.php

Insira o seguinte código:  

```// Hide Cats  
function excludeCat($query) {  
if ( $query->is_home ) {  
$query->set('cat', '-8,-9,-10,-29');  
}  
return $query;  
}  
add_filter('pre_get_posts', 'excludeCat');  
```

A partir de agora seu site não mostrará mais posts nestas categorias na página inicial.

Boa sorte!  
&#45;&#45;  
Lucas Saliés Brum    
a.k.a. sistematico
