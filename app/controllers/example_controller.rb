class ExampleController < ApplicationController
  def index
  end

  def show
    render json: Ldpath::Program.parse(params[:program]).evaluate(RDF::URI.new(params[:url]))
  end
end
