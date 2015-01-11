class AddTitleIdToMovie < ActiveRecord::Migration
  def change
    add_column :movies, :title, :string
    add_column :movies, :themoviedbid, :integer
  end
end