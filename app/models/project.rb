class Project < ApplicationRecord
	has_many :todos, class_name: TodoEntry
end
