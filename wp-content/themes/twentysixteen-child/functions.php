<?php



function lsr_script_enqueue() {

		wp_enqueue_style('customstyle', get_template_directory_uri() . '/js/leaflet.css', array(), '1.0.0', 'all');

		wp_enqueue_script('customscript', get_template_directory_uri() . '/js/leaflet.js', array(), '1.0.0', true);

		wp_enqueue_script('customscript', get_template_directory_uri() . '/js/jquery-1.12.0.js', array(), '1.0.0', true);

		wp_enqueue_script('customscript', get_template_directory_uri() . '/js/make-map.js', array(), '1.0.0', true);
		
		if (!is_admin()) add_action("wp_enqueue_scripts", "my_jquery_enqueue", 11);
function my_jquery_enqueue() {
   wp_deregister_script('jquery');
   wp_register_script('jquery', "http" . ($_SERVER['SERVER_PORT'] == 443 ? "s" : "") . "://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js", false, null);
   wp_enqueue_script('jquery');
}

}



add_action('wp_enqueue_scripts', 'lsr_script_enqueue');



