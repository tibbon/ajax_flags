class HomeController < ApplicationController

  def index
    @countries = Country.select([:id, :abbreviation, :name, :north_america]);
  end

  def countries

  end

  def data
    @countries = Country.select([:id, :abbreviation, :name, :north_america]);

    data = @countries
    render :json => { data: data}
  end



end
