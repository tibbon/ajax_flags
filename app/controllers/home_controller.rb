class HomeController < ApplicationController

  def index
    @countries = Country.select([:id, :abbreviation, :name, :north_america])
    respond_to do |f|
      f.html
      f.json { render :json => {countries: @countries} }
    end
  end

  def countries
    
  end

end
