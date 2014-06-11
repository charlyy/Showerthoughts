class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :commented_by
      t.string :comment_content

      t.timestamps
    end
  end
end
