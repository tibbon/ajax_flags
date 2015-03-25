class HomeController < ApplicationController
  respond_to :json, only: [:countries]
  def index
    @countries = Country.select([:id, :abbreviation, :name, :north_america])
  end

  def countries
    # 1st: start=0 limit=5, 0..4
    # 2nd: start=5 limit=5, 5..9
    # 3rd: start=10 limit=5, 10..14
    # ...
    start, limit = params[:start].to_i, params[:limit].to_i
    countries = Country.select([:id, :abbreviation, :name, :north_america])
    countries = countries.limit(limit)
    countries = countries.skip(start)
    render :json => countries.to_a
  end

end
