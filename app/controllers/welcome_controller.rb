class WelcomeController < ApplicationController
  require 'httparty'

  def index
  end

  def get_info
    # binding.pry
    # headlines = HTTParty.get("http://betawebapi.dowjones.com/fintech/articles/api/v1/instrument/goog")
    # ticker = Ticker.create(sym: 'GOOG')
    # headlines.each do |headline|
    #   data = Headline.create(data: headline)
    #   ticker.headlines << data
    # end
    # binding.pry
  end
end
