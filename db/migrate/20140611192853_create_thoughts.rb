class CreateThoughts < ActiveRecord::Migration
  def change
    create_table :thoughts do |t|
      t.string :created_by
      t.integer :upvote
      t.string :thought_content

      t.timestamps
    end
  end
end
