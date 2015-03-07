"use strict";

//show password
jQuery(document).ready(function(){
    jQuery("#pw").focus(function(){
        this.type = "text";
    }).blur(function(){
        this.type = "password";
    })   
});

//Search In Button
jQuery('#SignIn').on('click', function(){
  jQuery('.login').show();
  jQuery('#lightbox').fadeIn('slow');
});

//close
jQuery('#close').on('click', function(){
  jQuery('.login').hide('fast');
  jQuery('#lightbox').fadeOut('slow');
});

