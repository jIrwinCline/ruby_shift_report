class CreateEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :entries do |t|
      t.text :body
      t.string :time
      t.references :report

      t.timestamps
    end
  end
end
