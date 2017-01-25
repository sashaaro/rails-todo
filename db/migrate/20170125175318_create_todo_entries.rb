class CreateTodoEntries < ActiveRecord::Migration[5.0]
  def change
    create_table :todo_entries do |t|
      t.string :text
      t.boolean :isCompleted
      t.references :project, foreign_key: true

      t.timestamps
    end
  end
end
