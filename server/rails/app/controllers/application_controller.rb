class ApplicationController < ActionController::API
    require 'themoviedb'
    require 'yaml'


    before_filter :set_config
    config = YAML.load_file(File.join("#{Rails.root}/config", "local.yml"))
    themoviedbkey = config['themoviedb']['key']
    Tmdb::Api.key("#{themoviedbkey}")

    def set_config
        @configuration = Tmdb::Configuration.new
    end
end
