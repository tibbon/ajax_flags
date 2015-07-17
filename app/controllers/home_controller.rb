class HomeController < ApplicationController

  def index
    @countries = Country.select([:id, :abbreviation, :name, :north_america]);
    # @countries = Country.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: {countries: @countries}}
    end
  end

  def countries
    @countries = Country.all

    respond_to do |format|
      format.html
      format.json {render json: {countries: @countries}}
    end
  end

  def country
    @country = Country.select([:id, :abbreviation, :name, :north_america]);

    respond_to do |format|
      format.html
      format.json {render json: {countries: @country}}
    end
  end

end
