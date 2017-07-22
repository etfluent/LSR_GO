<?php
/**
 * Plugin Name: Simple Members Area
 * Plugin URI: http://www.3.7designs.co/blog/wordpress-simple-members-area
 * Description: A simple way to create a members area in WordPress
 * Version: 1.0
 * Author: 3.7 DESIGNS
 * Author URI: http://3.7designs.co
 * License: GPL2
 */

register_activation_hook( __FILE__, 'wp37_add_client_role' );
function wp37_add_client_role() { 
	$result = add_role(
	    'wp37_client',
	    __( 'Member' ),
	    array(
	        'read'         => true,
	        'edit_posts'   => false,
	        'delete_posts' => false,
			'read_private_pages' => true,
			'read_private_posts' => true
	    )
	);
}

add_action('after_setup_theme','wp37_remove_admin_bar');
function wp37_remove_admin_bar() { 
	$current_user = wp_get_current_user();
	$in_role = $current_user->roles[0];
	if($in_role == 'wp37_client')  { 
		show_admin_bar(false);
	}
}


add_filter( 'login_redirect', 'wp37_client_redirect',10,3);
function wp37_client_redirect($redirect_to,$request,$user) { 
	
	$in_role = $user->roles[0];
		
	if($in_role == 'wp37_client') { 
								
		// Check to see if there is a custom landing location
		$user_login_page = get_the_author_meta('custom_login_page',$user->ID);
		
		// Do we want to use the default landing location?
		if((empty($user_login_page)) || ($user_login_page == 'default')) { 
										
			$default_id = get_option('default-redirect-page');
			
			if(!empty($default_id)) { 
				$default_login_permalink = get_the_permalink($default_id);
				return $default_login_permalink;
			} else { 
				return $redirect_to;
			}
			
		
		} else { 
							
			$user_login_page_id = get_the_permalink($user_login_page);
			
			return $user_login_page_id;
		
		}
		
	} else { 
		
		return $redirect_to;
		
	}

}

add_action('wp_logout','wp37_redirect_after_logout');
function wp37_redirect_after_logout(){
  wp_redirect( home_url() );
  exit();
}

add_action( 'show_user_profile', 'wp37_client_custom_location' );
add_action( 'edit_user_profile', 'wp37_client_custom_location' );

function wp37_client_custom_location($user) { 
	
	$roles = array('wp37_client');
	
	$in_role = wp37_check_user_role($roles);

	if(($in_role) && (current_user_can('manage_options'))) { 
			
			$allPages = new WP_Query(array('post_type' => 'page','posts_per_page' => -1,'post_status' => 'private'));
			$current_login_page = esc_attr( get_the_author_meta( 'custom_login_page', $user->ID ) );
			
			?>

			<h3>User Login Page</h3>

			<table class="form-table">

				<tr>
					<th><label for="twitter">Landing Page</label></th>

					<td>
						<select name="custom_login_page" id="custom_login_page">
							<?php if((!empty($current_login_page)) && ($current_login_page != 'default')): ?>
								<option value="<?php echo $current_login_page; ?>"><?php echo get_the_title($current_login_page); ?></option>
							<?php else: ?>
								<option value="default">Default Landing Page</option>
							<?php endif; ?>
							<option value="default">---</option>
							<option value="default">Default</option>
							<?php while($allPages->have_posts()): $allPages->the_post(); global $post; ?>
								<option value="<?php echo $post->ID; ?>"><?php the_title(); ?></option>
							<?php endwhile; ?>
						</select>
						<span class="description">Please select the page you'd like this user to be redirected to after login.</span>
					</td>
				</tr>

			</table>
	<?php }
	
}

add_action( 'personal_options_update', 'wp37_save_custom_landing' );
add_action( 'edit_user_profile_update', 'wp37_save_custom_landing' );

function wp37_save_custom_landing( $user_id ) {
	
	if ( !current_user_can( 'edit_user', $user_id ) )
		return false;

	/* Copy and paste this line for additional fields. Make sure to change 'twitter' to the field ID. */
	update_usermeta( $user_id, 'custom_login_page', $_POST['custom_login_page'] );
	
}


function wp37_client_options_panel() { 
	
	?>
	<div class="wrap">
		<h2>Simple Members Area</h2>
		
		<form method="post" action="options.php"> 
			<?php 
			
			settings_fields( 'custom-login-group' );
			do_settings_sections( 'custom-login-group' );
			
			$default_redirect_page = esc_attr( get_option('default-redirect-page') );
			$allPages = new WP_Query(array('post_type' => 'page','posts_per_page' => -1,'post_status' => 'private'));
			 
			?>
			<table class="form-table">

				<tr>
					<th><label for="twitter">Default Member Landing Page</label></th>

					<td>
						<select name="default-redirect-page" id="default-redirect-page">
							<?php if($default_redirect_page): ?>
								<option value="<?php echo $default_redirect_page; ?>"><?php echo get_the_title($default_redirect_page); ?></option>
							<?php else: ?>
								<option value="1">Select a Page</option>
							<?php endif; ?>
							<option value="1">---</option>
							<?php while($allPages->have_posts()): $allPages->the_post(); global $post; ?>
								<option value="<?php echo $post->ID; ?>"><?php the_title(); ?></option>
							<?php endwhile; ?>
						</select>
						<span class="description">Please select the page you'd like members to be redirected to by default (you can override this on individual members by editing their profile.)</span>
					</td>
				</tr>

			</table>
			
			<?php submit_button(); ?>
			
		</form>
	</div>
	
	<?php 
}


function wp37_register_settings() { 
	register_setting( 'custom-login-group', 'default-redirect-page' );
}

add_action( 'admin_menu', 'wp37_add_settings_page' );
function wp37_add_settings_page() { 
	
	add_options_page(
	            'Member Login Settings', 
	            'Member Login', 
	            'manage_options', 
				 __FILE__,
	            'wp37_client_options_panel'
	        );
	
	add_action( 'admin_init', 'wp37_register_settings' );
			
}

function wp37_check_user_role($roles,$user_id=NULL) {
	// Get user by ID, else get current user
	if ($user_id)
		$user = get_userdata($user_id);
	else
		$user = wp_get_current_user();
 
	// No user found, return
	if (empty($user))
		return FALSE;
 
	// Append administrator to roles, if necessary
	if (!in_array('administrator',$roles))
		$roles[] = 'administrator';
 
	// Loop through user roles
	foreach ($user->roles as $role) {
		// Does user have role
		if (in_array($role,$roles)) {
			return TRUE;
		}
	}
 
	// User not in roles
	return FALSE;
}

add_shortcode('member_login','wp37_login_form_shortcode');
function wp37_login_form_shortcode() { 
	return '<div class="simple-member-login">'.wp_login_form(array('echo' => 0)).'</div>';
}


?>