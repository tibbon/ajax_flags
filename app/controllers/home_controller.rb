class HomeController < ApplicationController

  def index
    @countries = Country.select([:id, :abbreviation, :name, :north_america]);
  end

  def countries
  	@countries = []
  	number_of_countries = Country.all.count
  	counter = params[:step].to_i
		amount = params[:offset].to_i

		if (number_of_countries - counter) < amount 
			amount = number_of_countries - counter + 1
		end

		amount.times do 
			@countries << Country.find(counter)
			counter += 1
		end

    respond_to do |format|
    	format.json {render json: @countries.to_json}
    end
  end

  def all_countries
  	@countries = Country.all

  	respond_to do |format|
  		format.json {render json: @countries.to_json}
  	end
  end

end
