class AddTitleToReport < ActiveRecord::Migration[6.0]
  def change
    add_column :reports, :title, :string
  end
end
