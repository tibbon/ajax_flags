class HomeController < ApplicationController

  def index
    @countries = Country.select([:id, :abbreviation, :name, :north_america]);

    respond_to do |format|
      format.json { render json: {countries: @countries} }
      format.html # index.html.erb
      format.js {}
    end
  end

  def countries
    
  end

end
