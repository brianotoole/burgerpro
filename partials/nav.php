
<?php

add_action('wp_footer', 'render_nav');


function render_nav() {

  $menu = wp_nav_menu(
      array(
          'theme_location' => 'menu-1',
          'echo'           => false,
          'container'      => false,
          'menu_class'     => 'nav-mobile__inner',
      )
  );

  $nav_pos = get_option('burgerpro_nav_position')[0];
  $nav_size = get_option('burgerpro_nav_size');
  
  $output .= '
  <div class="nav-open-overlay"></div>
  <div class="header-mobile u-hidden-desktop header-mobile--'.$nav_pos.'" data-nav-position="'.$nav_pos.'">
	  <div class="header-mobile__toggle u-hidden-desktop">
		  <div class="nav-toggle" id="js-nav-toggle-mobile" data-nav-size="'.$nav_size.'">
			  <span class="nav-toggle__line nav-toggle__line--1"></span>
			  <span class="nav-toggle__line nav-toggle__line--2"></span>
		  	<span class="nav-toggle__line nav-toggle__line--3"></span>
		  </div><!--/.nav-toggle-->
    </div>
  </div>

  <nav id="js-nav-mobile" class="row nav-mobile">
  '.$menu.'
  </nav>';
  echo $output;
}