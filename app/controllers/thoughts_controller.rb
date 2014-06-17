class ThoughtsController < ApplicationController
  before_action :set_thought, only: [:show, :edit, :update, :destroy]

  respond_to :json, :html
  # GET /thoughts
  # GET /thoughts.json
  def index
    @thoughts = Thought.all
    respond_with @thoughts
  end

  # GET /thoughts/1
  # GET /thoughts/1.json
  def show
    respond_with @thoughts
  end

  # GET /thoughts/new
  def new
    @thought = Thought.new
  end

  # GET /thoughts/1/edit
  def edit
  end

  # POST /thoughts
  # POST /thoughts.json
  def create
    @thought = Thought.new(thought_params)

    if @thought.save
      render json: @thought, status: :created
    else
      render json: @thought.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /thoughts/1
  # PATCH/PUT /thoughts/1.json
  def update
    
      if @thought.update(thought_params)
        respond_to do |format|
        format.html { redirect_to @thought, notice: 'Thought was successfully updated.' }
        format.json { head :no_content }
        end
      else
        respond_to do |format|
        format.html { render action: 'edit' }
        format.json { render json: @thought.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /thoughts/1
  # DELETE /thoughts/1.json
  def destroy
    @thought.destroy
    respond_to do |format|
      format.html { redirect_to thoughts_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_thought
      @thought = Thought.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def thought_params
      params.require(:thought).permit(:created_by, :upvote, :thought_content)
    end
end

