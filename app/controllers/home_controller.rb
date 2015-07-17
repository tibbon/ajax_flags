class HomeController < ApplicationController

  def index

  end

  def countries

     @countries = Country.limit(params[:step]).offset(params[:offset]).select([:id, :abbreviation, :name, :north_america]);
      # limit the data

     render json: @countries
  end

end
