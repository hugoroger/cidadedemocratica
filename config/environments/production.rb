Cidadedemocratica::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # Code is not reloaded between requests
  config.cache_classes = true

  # Full error reports are disabled and caching is turned on
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  # Specifies the header that your server uses for sending files
  config.action_dispatch.x_sendfile_header = "X-Sendfile"

  # Disable Rails's static asset server (Apache or nginx will already do this)
  config.serve_static_assets = false

  # Compress JavaScripts and CSS
  config.assets.compress = true

  # Don't fallback to assets pipeline if a precompiled asset is missed
  config.assets.compile = false

  # Generate digests for assets URLs
  config.assets.digest = true

  # Defaults to Rails.root.join("public/assets")
  # config.assets.manifest = YOUR_PATH

  # Specifies the header that your server uses for sending files
  # config.action_dispatch.x_sendfile_header = "X-Sendfile" # for apache
  # config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect' # for nginx

  # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
  # config.force_ssl = true

  # See everything in the log (default is :info)
  # config.log_level = :debug

  # Use a different logger for distributed setups
  # config.logger = SyslogLogger.new

  # Add log rotation
  # 5 log files no bigger than 100 megabytes
  config.logger = Logger.new(Rails.root.join("log",Rails.env + ".log"), 5, 100*1024*1024)

  # Use a different cache store in production
  config.cache_store = :dalli_store

  # Enable serving of images, stylesheets, and JavaScripts from an asset server
  # config.action_controller.asset_host = "http://assets.example.com"

  # Precompile additional assets (application.js, application.css, and all non-JS/CSS are already added)
  # config.assets.precompile += %w( search.js )

  # Disable delivery errors, bad email addresses will be ignored
  # config.action_mailer.raise_delivery_errors = false

  # Enable threaded mode
  # config.threadsafe!

  # Disable delivery errors, bad email addresses will be ignored
  # config.action_mailer.raise_delivery_errors = false

  config.action_mailer.default_url_options = { :host => "cidadedemocratica.org.br" }

  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation can not be found)
  config.i18n.fallbacks = true

  # Send deprecation notices to registered listeners
  config.active_support.deprecation = :notify

  # config.middleware.use ExceptionNotification::Rack,
  #   :ignore_exceptions => [Mysql2::Error] + ExceptionNotifier.ignored_exceptions,
  #   :email => {
  #     :email_prefix => "[Exception - Cidade Democratica] ",
  #     :sender_address => %{"no-reply" <no-reply@cidadedemocratica.org.br>},
  #     :exception_recipients => [ENV['EXCEPTION_NOTIFICATION_EMAIL']]
  #   }

config.action_mailer.raise_delivery_errors = true 
    config.action_mailer.default_url_options = { host: '198.1.64.21', port: "3000" }
    ActionMailer::Base.delivery_method = :smtp
    ActionMailer::Base.perform_deliveries = true
    config.action_mailer.smtp_settings = {
        :address              => "smtp.gmail.com",
        :port                 => 25,
        :domain               => "gmail.com",
        :user_name            => "testing.bittern@gmail.com",
        :password             => "bittern1234",
        :authentication       => :plain,
        :enable_starttls_auto => true
    }
end
