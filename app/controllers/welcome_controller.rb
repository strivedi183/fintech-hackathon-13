class WelcomeController < ApplicationController
  require 'httparty'

  def index
  end

  def get_info
    # binding.pry
    first_symbol = params['first_symbol']
    first_symbol_headlines = HTTParty.get("http://betawebapi.dowjones.com/fintech/articles/api/v1/instrument/" + "#{first_symbol}")
    
    @first_symbol_headlines_array = Array.new
    
    first_symbol_headlines["Headlines"].each do |h|
      @first_symbol_headlines_array << { headline: h["Headline"], url: h["DocumentTypeUri"]}
    end

    second_symbol = params['second_symbol']
    @headlines_second_symbol = HTTParty.get("http://betawebapi.dowjones.com/fintech/articles/api/v1/instrument/" + "#{second_symbol}")

  end
end




    # ticker = Ticker.create(sym: "#{first_symbol}")
    # headlines.each do |headline|
    #   data = Headline.create(data: headline)
    #   ticker.headlines << data
    # end
    # binding.pry